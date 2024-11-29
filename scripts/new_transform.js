import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import omit from "lodash.omit";
import groupBy from "lodash.groupby";
import fetch from 'cross-fetch';

const getToken = async (db, tbl) => {
    const org = `${process.env.ORGANIZATION_SLUG}`
    const token = `${process.env.ORGANIZATION_TOKEN}`
    const response = await fetch("https://api.datasketch.co/v1/auth/bases", {
        method: 'POST',
        body: JSON.stringify({ org, token, db, tbl }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    return json.data
}

const get_data = async (db, tbl) => {
    const token = await getToken(db, tbl)

    const response = await fetch("https://bases.datasketch.co/tables/data", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    return json
}

const transform_data = (data) => {
    return data.data.map(item => {
        return Object.keys(item).reduce((acc, key) => {
            acc[data.fields.find(field => field.id === key).label] = data.fields.find(field => field.id === key).type === 'Num' ? parseFloat(item[key]) : item[key]
            return acc
        }, {})
    })
}

async function main() {
    const [sites_raw, themes_raw, tables_raw, proxys_raw, references_raw, proxy_inputs_raw, proxy_value_raw] = await Promise.all([
        get_data('sroi-impact-calculators', 'sites'),
        get_data(`${process.env.PROXY_DATABASE}`, 'themes'),
        get_data(`${process.env.PROXY_DATABASE}`, 'tables'),
        get_data(`${process.env.PROXY_DATABASE}`, 'proxies'),
        get_data(`${process.env.PROXY_DATABASE}`, 'list_references'),
        get_data(`${process.env.PROXY_DATABASE}`, 'proxy_inputs'),
        get_data(`${process.env.PROXY_DATABASE}`, 'proxy_values')
    ])


    const themes = transform_data(themes_raw)
    const tables = transform_data(tables_raw)
    const proxys = transform_data(proxys_raw)
    const references = transform_data(references_raw)
    const proxy_inputs = transform_data(proxy_inputs_raw)
    const proxy_value = transform_data(proxy_value_raw)
    const sites = transform_data(sites_raw).find(site => site.slug === `${process.env.PROXY_DATABASE}`)

    const data = {
        general: {
            organization: process.env.ORGANIZATION_SLUG,
            database: process.env.PROXY_DATABASE,
            logo: sites.logo,
            banner: sites.banner,
            theme: sites.theme,
            main_image: sites.main_image,
            bg_image1: sites.bg_image1,
            bg_image2: sites.bg_image2
        },
        proxy_inputs: proxy_inputs.map(item => ({ ...omit(item, ["rcd___id"]), changed: false })),
        proxy_values: proxy_value.map(item => ({ ...omit(item, ["rcd___id"]), changed: false, ranges: item.value2 ? true : false }))
    }


    // General
    const generalSection = themes.filter(row => row.section.trim() === 'general')
    generalSection.forEach(row => {
        data.general[row.variable] = row.value
    })


    // Tabs
    const tabs = themes.filter(item => item.section.trim().split('/').length === 2)

    const groupedBySection = groupBy(tabs, 'section')

    data.tabs = Object.keys(groupedBySection).map(sectionKey => {
        return groupedBySection[sectionKey].reduce((accumulator, currentItem) => {
            accumulator[currentItem.variable] = currentItem.value
            return accumulator
        }, {
            tables: [],
            list: sectionKey === 'tabs/references' ? references.map(item => omit(item, ["rcd___id"])) : []
        })
    })

    // Tables
    /* const tables = themes.filter(item => item.section.split('/').length === 4)

    const groupByTables = groupBy(tables, 'section')

    data.tabs.find(tab => tab.type === 'table').tables = Object.keys(groupByTables).map(tableKey => {
        return groupByTables[tableKey].reduce((accumulator, currentItem) => {
            accumulator[currentItem.variable] = currentItem.value
            return accumulator
        }, {
            changed: false,
            rows: proxys.map(item => ({ ...omit(item, ["rcd___id"]), changed: false })).filter(item => item.type === tableKey.split('/')[3])
        })
    }) */

    const groupByImpact = groupBy(proxys, 'type')

    data.tabs.find(tab => tab.type === 'table').tables = Object.keys(groupByImpact).map(tableKey => {
        return {
            changed: false,
            ranges: groupByImpact[tableKey].reduce((acc, item) => item.value2 ? true : acc, false),
            rows: groupByImpact[tableKey].map(item => omit(item, ["rcd___id"])),
            id: tableKey,
            title: tables.find(item => item.id === tableKey).title,
            tooltip: tables.find(item => item.id === tableKey).tooltip,
            totalValue: groupByImpact[tableKey].reduce((acc, item) => acc + item.value, 0),
            totalValue2: groupByImpact[tableKey].reduce((acc, item) => acc + (item.value2 ? item.value2 : item.value), 0)
        }
    })

    const groupByStakeholders = groupBy(proxys, 'stakeholders')

    data.tabs.find(tab => tab.type === 'table').tables_stakeholders = Object.keys(groupByStakeholders).map(tableKey => {
        return {
            changed: false,
            ranges: groupByStakeholders[tableKey].reduce((acc, item) => item.value2 ? true : acc, false),
            rows: groupByStakeholders[tableKey].map(item => omit(item, ["rcd___id"])),
            id: tableKey,
            title: tables.find(item => item.id === tableKey).title,
            tooltip: tables.find(item => item.id === tableKey).tooltip,
            totalValue: groupByStakeholders[tableKey].reduce((acc, item) => acc + item.value, 0),
            totalValue2: groupByStakeholders[tableKey].reduce((acc, item) => acc + (item.value2 ? item.value2 : item.value), 0)
        }
    })


    // Guardar en filesystem
    await writeFile(path.join(process.cwd(), 'src', 'site-data.json'), JSON.stringify(data))
}

main().catch(err => {
    console.error(err);
    process.exit(1)
})
