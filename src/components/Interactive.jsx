import { useState, useEffect, useRef } from 'react';
import Table from './Table';
import data from '../data/format.json'
import classNames from 'classnames';
// import { proxy1, proxy1_formula, proxy2, proxy2_formula, proxy3, proxy3_formula, proxy9, proxy9_formula, proxy10, proxy10_formula, proxy11, proxy11_formula, proxy12, proxy12_formula, proxy18_formula, environmental, totalTable } from '../utils/functions'

/* const variables = [
    {
        'id': 'var01',
        'description': 'Number of artists employed',
        'value': 24
    },
    {
        'id': 'var02',
        'description': 'Average number of hours worked by a core artist',
        'value': 189
    },
    {
        'id': 'var03',
        'description': 'Average hourly wage earned by an artist',
        'value': 10.1
    },
    {
        'id': 'var04',
        'description': 'Average artist attendance at extra service offering (2-6)',
        'value': 4
    },
    {
        'id': 'var05',
        'description': 'Number of fulltime staff (includes administrative roles)',
        'value': 6
    },
    {
        'id': 'var06',
        'description': 'Average wage of full-time staff artists (non administrative roles)',
        'value': 32409
    },
    {
        'id': 'var07',
        'description': 'Number of part-time staff',
        'value': 2
    },
    {
        'id': 'var08',
        'description': 'Average wage of part-time staff artists ',
        'value': 11172
    },
    {
        'id': 'var09',
        'description': 'Number of cottage industry artists',
        'value': 3
    },
    {
        'id': 'var10',
        'description': 'Average wage of cottage artists',
        'value': 1671
    },
    {
        'id': 'var11',
        'description': 'Number of major community partnerships',
        'value': 0
    },
    {
        'id': 'var12',
        'description': 'Number of volunteers for Honey for the Heart',
        'value': 2000
    },
    {
        'id': 'var13',
        'description': 'Number of volunteer hours for all PW activities',
        'value': 7712
    },
    {
        'id': 'var14',
        'description': 'Number of OU Interns annually',
        'value': 5
    },
    {
        'id': 'var15',
        'description': 'Number of OU class observers/other OU activities',
        'value': 3770
    },
    {
        'id': 'var16',
        'description': 'Total revenue from sales',
        'value': 275000
    },
    {
        'id': 'var17',
        'description': 'Average cost of PW flower (33-150)',
        'value': 91.5
    },
    {
        'id': 'var18',
        'description': 'LBS of aouminum printing plates',
        'value': 1600
    },
    {
        'id': 'var19',
        'description': 'LBS of wood for flowers',
        'value': 900
    },
    {
        'id': 'var20',
        'description': 'LBS of fabric',
        'value': 1200
    },
    {
        'id': 'var21',
        'description': 'Increase in average reported FTE and PTE starting salary for graduates with service learning experience (Matthews et al., 2015)',
        'value': 6500
    },
    {
        'id': 'var22',
        'description': 'Consumers are willing to pay up to 5% more for environmentally friendly products (Holbrook, 2019).',
        'value': 0.05
    },
    {
        'id': 'var23',
        'description': 'Wellbeing valuation of sense of identity',
        'value': 1500
    },
    {
        'id': 'var24',
        'description': 'Wellbeing valuation of independence/agency',
        'value': 2500
    },
    {
        'id': 'var25',
        'description': 'Health benefits of having a sense of connection with others',
        'value': 2000
    },
    {
        'id': 'var26',
        'description': '% time spent informally learning from peers',
        'value': 0.15
    },
    {
        'id': 'var27',
        'description': 'FMV of creative teacher',
        'value': 15000
    },
    {
        'id': 'var28',
        'description': 'Health benefits of having sense of purpose at work',
        'value': 2500
    },
    {
        'id': 'var29',
        'description': 'Average cost of respite care per hour in Ohio (zip recruiter average Ohio)',
        'value': 15.52
    },
    {
        'id': 'var30',
        'description': 'Discount for counterfactual (number of artist support person who said they would take artist to dayhab instead)',
        'value': 0.1
    },
    {
        'id': 'var31',
        'description': 'Wellbeing valuation of increased community connection',
        'value': 1600
    },
    {
        'id': 'var32',
        'description': 'Health impacts of less stress in caregiving /value of knowing loved one is safe',
        'value': 2600
    },
    {
        'id': 'var33',
        'description': 'Population of Athens City',
        'value': 24130
    },
    {
        'id': 'var34',
        'description': 'Value of placemaking (living in a place with art murals)',
        'value': 100
    },
    {
        'id': 'var35',
        'description': 'Value of a volunteer hour',
        'value': 29.17
    },
    {
        'id': 'var36',
        'description': 'Value of a micro-credential in cultural competence',
        'value': 100
    },
    {
        'id': 'var37',
        'description': 'For every $1 spent in a local store, $0.58 will be re-invested in the local community',
        'value': 0.58
    },
    {
        'id': 'var38',
        'description': 'Total Annual Operating Costs ',
        'value': 695168
    },
    {
        'id': 'var39',
        'description': 'Total value of donations of materials',
        'value': 10000
    },
    {
        'id': 'var40',
        'description': 'Artist support person time spent finding transportation',
        'value': 2424
    }
] */

// const tablesReal = [
//     {
//         "type": "economic_impact",
//         "title": "Economic impact",
//         "information": "Lorem ipsum",
//         "totalValue": 313874.6,
//         "f_formula": totalTable,
//         "rows": [
//             {
//                 "stakeholders": "Core Artists",
//                 "outcomes": "Ability to make a wage in a creative capacity",
//                 "value": 45813.6,
//                 "funtion": proxy1,
//                 "f_formula": proxy1_formula,
//                 "var": ["var01", "var02", "var03"],
//                 "outcomes2": "Total Value of ability to make a wage in a creative capacity",
//                 "rows": {
//                     "stakeholders": "Proxy 1",
//                     "outcomes": [
//                         "Number of artists employed",
//                         "Average number of hours worked by a core artist",
//                         "Average hourly wage earned by an artist"
//                     ],
//                     "value": [
//                         24,
//                         189,
//                         10.1
//                     ]
//                 },
//                 "formula": "24 * 189 * 10.1 = 45813.6"
//             },
//             {
//                 "stakeholders": "Staff Artists",
//                 "outcomes": "Increased ability to be employed in a creative capacity",
//                 "value": 221811,
//                 "funtion": proxy2,
//                 "f_formula": proxy2_formula,
//                 "var": ["var05", "var06", "var07", "var08", "var09", "var10"],
//                 "outcomes2": "Total Value of ability to make a wage in a creative capacity",
//                 "rows": {
//                     "stakeholders": "Proxy 2",
//                     "outcomes": [
//                         "Number of fulltime staff (includes administrative roles)",
//                         "Average wage of full-time staff artists (non administrative roles)",
//                         "Number of part-time staff",
//                         "Average wage of part-time staff artists",
//                         "Number of cottage industry artists",
//                         "Average wage of cottage artists"
//                     ],
//                     "value": [
//                         6,
//                         32409,
//                         2,
//                         11172,
//                         3,
//                         1671
//                     ]
//                 },
//                 "formula": "6 * 32409 + 2 * 11172 + 3 * 1671 = 221811"
//             },
//             {
//                 "stakeholders": "Ohio University Students",
//                 "outcomes": "Increased experiential learning experience",
//                 "value": 32500,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var14", "var21"],
//                 "outcomes2": "Value of increased experiential learning experience",
//                 "rows": {
//                     "stakeholders": "Proxy 3",
//                     "outcomes": [
//                         "Number of OU Interns annually",
//                         "Increase in average reported FTE and PTE starting salary for graduates with service learning experience (Matthews et al., 2015)"
//                     ],
//                     "value": [
//                         5,
//                         6500
//                     ]
//                 },
//                 "formula": "5 * 6500 = 32500"
//             },
//             {
//                 "stakeholders": "Customers",
//                 "outcomes": "Ability to purchase goods to support a mission (consious consumption)",
//                 "value": 13750,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var16", "var22"],
//                 "outcomes2": "Value of ability to purchase goods to support a mission (consious consumption)",
//                 "rows": {
//                     "stakeholders": "Proxy 4",
//                     "outcomes": [
//                         "Total revenue from sales",
//                         "Consumers are willing to pay up to 5% more for environmentally friendly products (Holbrook, 2019)."
//                     ],
//                     "value": [
//                         275000,
//                         "5%"
//                     ]
//                 },
//                 "formula": "275000 * 5% = 13750"
//             },
//             {
//                 "stakeholders": "Similar Organizations",
//                 "outcomes": "Increased Sustainability",
//                 "value": 0,
//                 "rows": {
//                     "stakeholders": "Proxy 5",
//                     "outcomes": [
//                         "",
//                         ""
//                     ],
//                     "value": [
//                         0,
//                         0
//                     ]
//                 },
//                 "formula": "0 + 0 = x"
//             }
//         ],
//         "formula": "45813.6 + 221811 + 32500 + 13750 = 313874.6"
//     },
//     {
//         "type": "social_impact",
//         "title": "Social impact",
//         "information": "Lorem ipsum",
//         "totalValue": 3515917.89,
//         "f_formula": totalTable,
//         "rows": [
//             {
//                 "stakeholders": "Core Artists",
//                 "outcomes": "Artists build a sense of identity",
//                 "value": 36000,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var01", "var23"],
//                 "outcomes2": "Total value of building a sense of identity",
//                 "rows": {
//                     "stakeholders": "Proxy 6",
//                     "outcomes": [
//                         "Number of artists employed",
//                         "Wellbeing valuation of sense of identity"
//                     ],
//                     "value": [
//                         24,
//                         1500
//                     ]
//                 },
//                 "formula"
//                     : "24 * 1500 = 36000"
//             },
//             {
//                 "stakeholders": "Core Artists",
//                 "outcomes": "Increased maturity and self-reliance",
//                 "value": 60000,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var01", "var24"],
//                 "outcomes2": "Total value of increased maturity and self-reliance",
//                 "rows": {
//                     "stakeholders": "Proxy 7",
//                     "outcomes": [
//                         "Number of artists employed",
//                         "Wellbeing valuation of independence/agency"
//                     ],
//                     "value": [
//                         24,
//                         2500
//                     ]
//                 },
//                 "formula": "24 * 2500 = 60000"
//             },
//             {
//                 "stakeholders": "Core Artists",
//                 "outcomes": "Elevated well-being",
//                 "value": 48000,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var01", "var25"],
//                 "outcomes2": "Total value of elevated well-being",
//                 "rows": {
//                     "stakeholders": "Proxy 8",
//                     "outcomes": [
//                         "Number of artists employed",
//                         "Health benefits of having a sense of connection with others"
//                     ],
//                     "value": [
//                         24,
//                         2000
//                     ]
//                 },
//                 "formula": "24 * 2000 = 48000"
//             },
//             {
//                 "stakeholders": "Core Artists",
//                 "outcomes": "Increased reciprocal learning - reciprocal mentoring (skill building/proficiency)",
//                 "value": 72000,
//                 "funtion": proxy9,
//                 "f_formula": proxy9_formula,
//                 "var": ["var01", "var05", "var07", "var26", "var27"],
//                 "outcomes2": "Value of increased reciprocal learning",
//                 "rows": {
//                     "stakeholders": "Proxy 9",
//                     "outcomes": [
//                         "Number of artists employed",
//                         "Number of fulltime staff (includes administrative roles)",
//                         "Number of part-time staff",
//                         "% time spent informally learning from peers",
//                         "FMV of creative teacher"
//                     ],
//                     "value": [
//                         24,
//                         6,
//                         2,
//                         "15%",
//                         15000
//                     ]
//                 },
//                 "formula": "(24 + 6 + 2) * 15% * 15000 = 72000"
//             },
//             {
//                 "stakeholders": "Staff Artists",
//                 "outcomes": "Increased sense of purpose",
//                 "value": 20000,
//                 "funtion": proxy10,
//                 "f_formula": proxy10_formula,
//                 "var": ["var05", "var07", "var28"],
//                 "outcomes2": "Value of increased sense of purpose",
//                 "rows": {
//                     "stakeholders": "Proxy 10",
//                     "outcomes": [
//                         "Number of Staff Artists",
//                         "Number of fulltime staff (includes administrative roles)",
//                         "Health benefits of having sense of purpose at work"
//                     ],
//                     "value": [
//                         6,
//                         2,
//                         2500
//                     ]
//                 },
//                 "formula": "(6 + 2) * 2500 = 20000"
//             },
//             {
//                 "stakeholders": "Artist Support People",
//                 "outcomes": "Increased help with caretaking",
//                 "value": 63358.85,
//                 "funtion": proxy11,
//                 "f_formula": proxy11_formula,
//                 "var": ["var01", "var02", "var29", "var30"],
//                 "outcomes2": "Total value of increased help with caretaking",
//                 "rows": {
//                     "stakeholders": "Proxy 11",
//                     "outcomes": [
//                         "Number of artists employed (1 artist support person per artist)",
//                         "Hours worked by artists",
//                         "Average cost of respite care per hour in Ohio (zip recruiter average Ohio)",
//                         "Discount for counterfactual (number of artist support person who said they would take artist to dayhab instead)"
//                     ],
//                     "value": [
//                         24,
//                         189,
//                         15.52,
//                         "10%"
//                     ]
//                 },
//                 "formula": "(24 * 189 * 15.52) - (24 * 189 * 15.52 * 10%) = 63358.85"
//             },
//             {
//                 "stakeholders": "Artist Support People",
//                 "outcomes": "Increased sense of community and community inclusion",
//                 "value": 76800,
//                 "funtion": proxy12,
//                 "f_formula": proxy12_formula,
//                 "var": ["var01", "var31"],
//                 "outcomes2": "Total value of increased sense of community inclusion",
//                 "rows": {
//                     "stakeholders": "Proxy 12",
//                     "outcomes": [
//                         "Number of artist support people (24 artists multipled times 2 to represent family impacts)",
//                         "Wellbeing valuation of increased community connection"
//                     ],
//                     "value": [
//                         48,
//                         1600
//                     ]
//                 },
//                 "formula": "48 * 1600 = 76800"
//             },
//             {
//                 "stakeholders": "Artist Support People",
//                 "outcomes": "Stress reduction",
//                 "value": 124800,
//                 "funtion": proxy12,
//                 "f_formula": proxy12_formula,
//                 "var": ["var01", "var32"],
//                 "outcomes2": "Total value of stress reduction",
//                 "rows": {
//                     "stakeholders": "Proxy 13",
//                     "outcomes": [
//                         "Number of artist support people reporting PW leads them to experience less stress about their artists's safety (24 artists multipled times 2 to represent family impacts)",
//                         "Health impacts of less stress in caregiving /value of knowing loved one is safe"
//                     ],
//                     "value": [
//                         48,
//                         2600
//                     ]
//                 },
//                 "formula": "48 + 2600 = 124800"
//             },
//             {
//                 "stakeholders": "Community Members",
//                 "outcomes": "Improved community pride and identity",
//                 "value": 2413000,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var33", "var34"],
//                 "outcomes2": "Value of Improved community pride and identity",
//                 "rows": {
//                     "stakeholders": "Proxy 14",
//                     "outcomes": [
//                         "Population of Athens City",
//                         "Value of placemaking (living in a place with art murals)"
//                     ],
//                     "value": [
//                         24130,
//                         100
//                     ]
//                 },
//                 "formula": "24130 * 100 = 2413000"
//             },
//             {
//                 "stakeholders": "Community Members",
//                 "outcomes": "A place where people network and connect",
//                 "value": 224959.04,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var13", "var35"],
//                 "outcomes2": "Value of a place where people network and connect",
//                 "rows": {
//                     "stakeholders": "Proxy 15",
//                     "outcomes": [
//                         "Hours of volunteering from all PassionWorks volunteers",
//                         "Value of a volunteer hour"
//                     ],
//                     "value": [
//                         7712,
//                         29.17
//                     ]
//                 },
//                 "formula": "7712 * 29.17 = 224959.04"
//             },
//             {
//                 "stakeholders": "Ohio University Students",
//                 "outcomes": "Development of cultural competence",
//                 "value": 377000,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var15", "var36"],
//                 "outcomes2": "Value of development of cultural competence",
//                 "rows": {
//                     "stakeholders": "Proxy 16",
//                     "outcomes": [
//                         "Number of OU class observers/other OU activities",
//                         "Value of a micro-credential in cultural competence"
//                     ],
//                     "value": [
//                         3770,
//                         100
//                     ]
//                 },
//                 "formula": "3770 * 100 = 377000"
//             },
//             {
//                 "stakeholders": "Government",
//                 "outcomes": "Increased local money flows",
//                 "value": 159500,
//                 "funtion": proxy3,
//                 "f_formula": proxy3_formula,
//                 "var": ["var16", "var37"],
//                 "outcomes2": "Value of increased money flows",
//                 "rows": {
//                     "stakeholders": "Proxy 17",
//                     "outcomes": [
//                         "Total PassionWorks revenue",
//                         "For every $1 spent in a local store, $0.58 will be re-invested in the local community"
//                     ],
//                     "value": [
//                         275000,
//                         0.58
//                     ]
//                 },
//                 "formula": "275000 * 0.58 = 159500"
//             }
//         ],
//         "formula": "36000 + 60000 + 48000 + 72000 + 20000 + 63358.85 + 76800 + 124800 + 2413000 + 224959.04 + 377000 = 3515917.888"
//     },
//     {
//         "type": "environmental_impact",
//         "title": "Environmental Impact",
//         "information": "Lorem ipsum",
//         "totalValue": 10689.95,
//         "f_formula": totalTable,
//         "rows": [
//             {
//                 "stakeholders": "Suppliers/Vendors",
//                 "outcomes": "Increased ability to upcycle their own discard materials",
//                 "value": 10689.95,
//                 "funtion": environmental,
//                 "f_formula": proxy18_formula,
//                 "var": ["var18", "var19", "var20"],
//                 "outcomes2": "Total environmental savings - emobdied energy and social cost of carbon averted",
//                 "rows": {
//                     "stakeholders": "Proxy 18",
//                     "outcomes": [
//                         "kg of aluminum printing plates reused ",
//                         "Dollar Value of EC per 1000 kg of aluminum framing ($) (Greenspec, 2023)",
//                         "Total embodied carbon cost savings of aluminum reused",
//                         "kg of wood for flowers",
//                         "Dollar Value of EC per 1000 kg of processed wood ($) (Greenspec, 2023)",
//                         "Total embodied carbon cost savings of processed wood reused",
//                         "Total Tons of reused/upcycled materials (pounds to tons converstion)",
//                         "metric tons CO2 equivalent per ton of food waste (O'Brien, 2016, Table 6)",
//                         "Social Cost of Carbon",
//                         "Total carbon cost avoided of reused materials"
//                     ],
//                     "value": [
//                         720,
//                         14229,
//                         10244.88,
//                         405,
//                         36.72,
//                         14.87,
//                         1.85,
//                         1.54,
//                         151,
//                         430.20
//                     ]
//                 },
//                 "formula": "430.20 + 10244.88 + 14.87 = 10689.95"
//             }
//         ],
//         "formula": "430.20 + 10244.88 + 14.87 = 10689.95"
//     }
// ]



export default function Interactive() {
    const color = '#00694E'
    const isGeneric = true
    const [values, setValues] = useState([...data.proxy_inputs, ...data.proxy_values])
    const [outputs, setOutputs] = useState(data.proxy_inputs)
    const [tables, setTables] = useState(data.tabs[0].tables)
    const [socialValue, setSocialValue] = useState(data.statistics_section.return)
    const tableRef = useRef()
    const [hasLimit, setHasLimit] = useState(false)

    const updateFieldChanged = index => e => {
        let newArr = [...outputs]
        newArr[index].value = e.target.value === '' ? 0 : parseFloat(e.target.value)

        setOutputs(newArr);
        updateTable()
    }

    const updateTable = () => {
        let newTable = [...tables]
        let newValues = [...values]
        let social = 0
        for (let t of newTable) {
            let total = 0
            for (let r of t.rows) {
                const vars = r.variables.split(",")
                let temp = r.formula
                for (let variable of vars) {
                    temp = temp.replaceAll(variable, newValues.find(ele => ele.id === variable).value)
                }
                r.value = eval(`${temp}`)
                r.formula_str = `${temp} = ${r.value}`
                total = total + r.value
            }
            const listaTotales = t.rows.map(ele => ele.value)
            t.totalValue = total
            social = social + total
        }
        social = social / (outputs[0].value + outputs[1].value)
        setSocialValue(social)
        setTables(tables)
        setValues(newValues)
    }

    useEffect(() => {
        const element = tableRef.current
        const { offsetWidth, scrollWidth } = element
        const limitWidth = scrollWidth - offsetWidth

        const handleScroll = (e) => {
            const { scrollLeft } = e.target
            if ((limitWidth - 5) > scrollLeft) {
                setHasLimit(false)
            } else {
                setHasLimit(true)
            }
        }

        element.addEventListener('scroll', handleScroll)

        return () => element.removeEventListener('scroll', handleScroll)
    }, [tableRef.current])

    const formatAs = (value, unit) => {
        let config = {}
        switch (unit) {
            case 'currency':
                config = { style: 'currency', currency: 'USD' }
                break
            case 'percentage':
                config = { style: 'percent' }
                 break
            default:
                break
        }
        return new Intl.NumberFormat('en-US', config).format(value)
    }

    return (
        <div className='pt-12 pb-9'>
            <div className='u-container'>
                <div className='rounded-2xl overflow-hidden mb-20'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='m-5 bg-robin-egg-blue/5 pt-8 text-2xl py-8 px-10'>
                            <h2 className="text-2xl text-center">
                                For every
                                <br />
                                <span className="font-semibold" style={{ color }}>$1</span>
                                <br />
                                invested in Passion Works
                            </h2>
                            <div className="mt-5 rounded-lg text-center">
                                {/* <p className='text-2xl'>A social value</p> */}
                                <p className="text-3xl font-semibold mt-1" >
                                    $ {socialValue.toFixed(2)}
                                </p>
                                <div className="bg-silver h-[0.5px] mt-5"></div>
                                <p className="text-gray-2 text-center mt-3 text-lg lg:text-2xl">
                                    of social, economic, and environmental value is created.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div ref={tableRef} className='overflow-x-scroll lg:overflow-hidden rounded-2xl shadow'>
                                <div className='w-[450px] lg:w-auto'>
                                    <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
                                        backgroundColor: isGeneric ? '#fff' : color
                                    }}>
                                        <div className='flex items-center gap-x-2'>
                                            <h3 className='text-base lg:text-xl text-black font-medium'>What are the costs?</h3>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                                        <div className="col-span-8">
                                            <h4 className='text-gray-2 text-sm'>
                                                Description
                                            </h4>
                                        </div>
                                        <div className="col-span-4 pl-12">
                                            <h4 className='text-gray-2 text-sm'>
                                                Value
                                            </h4>
                                        </div>
                                    </div>
                                    {
                                        outputs.slice(0, 3).map((item, i) => (
                                            <div key={i} className='grid pb-3 grid-cols-12 py-1 px-5 bg-white'>
                                                <div className="col-span-8">
                                                    <h4 className='text-sm lg:text-base text-black'>
                                                        {item.description}
                                                    </h4>
                                                </div>
                                                <div className="col-span-4 pl-8">
                                                    <input type="text" value={item.value} onChange={updateFieldChanged(i)} className="text-right w-14 " />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimit, 'right-4': !hasLimit })}>
                                    {'>'}
                                </div>
                                <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimit, 'left-4': hasLimit })}>
                                    {'<'}
                                </div> */}
                            </div>
                            <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimit, 'right-4': !hasLimit })}>
                                {'>'}
                            </div>
                            <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimit, 'left-4': hasLimit })}>
                                {'<'}
                            </div>
                        </div>
                    </div>

                    <div ref={tableRef} className='overflow-x-scroll lg:overflow-hidden rounded-2xl shadow'>
                        <div className='w-[600px] lg:w-auto'>
                            <div className='pt-5 pb-2.5 pl-5 pr-8 mt-5' style={{
                                backgroundColor: isGeneric ? '#fff' : color
                            }}>
                                <div className='flex items-center gap-x-2'>
                                    <h3 className='text-base lg:text-xl text-black font-medium'>What are the numbers?</h3>
                                </div>
                            </div>

                            <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                                <div className="col-span-10">
                                    <h4 className='text-gray-2 text-sm'>
                                        Description
                                    </h4>
                                </div>
                                <div className="col-span-2 pl-12">
                                    <h4 className='text-gray-2 text-sm'>
                                        Value
                                    </h4>
                                </div>
                            </div>
                            {
                                outputs.slice(3, 23).map((item, i) => (
                                    <div key={i} className='grid grid-cols-12 pb-3 py-1 px-5 bg-white '>
                                        <div className="col-span-10">
                                            <h4 className='text-sm lg:text-base text-black'>
                                                {item.description}
                                            </h4>
                                        </div>
                                        <div className="col-span-2 pl-8">
                                            <input type="text" value={item.value} onChange={updateFieldChanged(i + 3)} className="text-right w-14" />
                                        <div className="col-span-4 pl-8">
                                            <input type="text" value={formatAs(item.value, item.unit)} onChange={updateFieldChanged(i)} className="w-full" />
                                        </div>
                                    </div>
                                ))
                            }
                            {/* <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimit, 'right-4': !hasLimit })}>
                                {'>'}
                            </div>
                            <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimit, 'left-4': hasLimit })}>
                                {'<'}
                            </div> */}
                        </div>
                    </div>
                    <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
                        backgroundColor: isGeneric ? '#fff' : color
                    }}>
                        <div className='flex items-center gap-x-2'>
                            <h3 className='text-xl text-black'>Program Outputs</h3>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                        <div className="col-span-10">
                            <h4 className='text-gray-2 text-sm'>
                                Description
                            </h4>
                        </div>
                        <div className="col-span-2 pl-12">
                            <h4 className='text-gray-2 text-sm'>
                                Value
                            </h4>
                        </div>
                    </div>
                    {
                        outputs.slice(3, 23).map((item, i) => (
                            <div key={i} className='grid grid-cols-12 py-1 px-5 bg-white '>
                                <div className="col-span-10">
                                    <h4 className='text-black'>
                                        {item.description}
                                    </h4>
                                </div>
                                <div className="col-span-2 pl-8">
                                    <input type="text" value={formatAs(item.value, item.unit)} onChange={updateFieldChanged(i + 3)} className="w-full" />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='space-y-12'>
                    {/* TABLES */}
                    {
                        tables.map((table, i) => {
                            if (table.id === 'economic_impact' || table.id === 'social_impact' || table.id === 'environmental_impact') {
                                return (
                                    <Table key={`table-${i + 1}`} color={color} data={table} isLarge />
                                )
                            } else {
                                return (
                                    <Table key={`table-${i + 1}`} color={color} data={table} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}