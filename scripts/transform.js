import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { writeFile } from 'fs/promises'
import path from 'path'
import omit from "lodash.omit";
import groupBy from "lodash.groupby";

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: 'uploads.dskt.ch',
    Key: key,
  });

  const { Body } = await client.send(command);

  const contents = await Body?.transformToString();
  const data = JSON.parse(contents || "") || [];

  return data
}

async function main() {
  const [themes, proxys, references, proxy_inputs, prooxy_value] = await Promise.all([
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/themes.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxies.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/list_references.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxy_inputs.json`),
    getObject(`${process.env.ORGANIZATION_SLUG}/${process.env.PROXY_DATABASE}/proxy_values.json`)
  ])

  const data = {
    general: {},
    proxy_inputs: proxy_inputs.map(item => ({ ...omit(item, ["rcd___id"]), changed: false })),
    proxy_values: prooxy_value.map(item => ({ ...omit(item, ["rcd___id"]), changed: false }))
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
  const tables = themes.filter(item => item.section.split('/').length === 4)

  const groupByTables = groupBy(tables, 'section')

  data.tabs.find(tab => tab.type === 'table').tables = Object.keys(groupByTables).map(tableKey => {
    return groupByTables[tableKey].reduce((accumulator, currentItem) => {
      accumulator[currentItem.variable] = currentItem.value
      return accumulator
    }, {
      changed: false,
      rows: proxys.map(item => ({ ...omit(item, ["rcd___id"]), changed: false })).filter(item => item.type === tableKey.split('/')[3] + '_impact')
    })
  })


  // Guardar en filesystem
  await writeFile(path.join(process.cwd(), 'src', 'site-data.json'), JSON.stringify(data))
}

main().catch(err => {
  console.error(err);
  process.exit(1)
})
