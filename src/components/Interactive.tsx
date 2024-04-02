import { useState, useEffect, useRef } from 'react';
import Table from './Table';
import classNames from 'classnames';
import { parseToNumber } from '../utils';
import CurrencyInput from 'react-currency-input-field';
import OutcomeText from './OutcomeText';
import hexRgb from 'hex-rgb';


export default function Interactive({ top = "top-2/3", data }) {
  const color = data.general.theme
  const isGeneric = true
  const [values, setValues] = useState([...data.proxy_inputs, ...data.proxy_values])
  const [outputs, setOutputs] = useState(data.proxy_inputs)
  const [tables, setTables] = useState(data.tabs[0].tables)
  const [socialValue, setSocialValue] = useState(data.general.return)
  const tableRefCosts = useRef<HTMLDivElement>()
  const tableRefNumbers = useRef<HTMLDivElement>()
  const [hasLimit, setHasLimit] = useState(false)
  const [hasLimitNumbers, setHasLimitNumbers] = useState(false)
  const [prev, setPrev] = useState(0)

  const updateFieldChanged = index => (value) => {
    let newArr = [...outputs]
    const newValue = parseToNumber(value)
    newArr[index].value = value === '' ? 0 : newValue

    setOutputs(newArr);
    if (newValue !== prev) {
      updateTable()
    }
    setPrev(newValue)
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
        const prev_value = r.value
        r.value = eval(`${temp}`)
        r.formula_str = `${temp} = ${r.value}`
        total = total + r.value
        r.changed = prev_value !== r.value
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
    const element = tableRefCosts.current
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
  }, [tableRefCosts.current])

  useEffect(() => {
    const element = tableRefNumbers.current
    const { offsetWidth, scrollWidth } = element
    const limitWidth = scrollWidth - offsetWidth

    const handleScroll = (e) => {
      const { scrollLeft } = e.target
      if ((limitWidth - 5) > scrollLeft) {
        setHasLimitNumbers(false)
      } else {
        setHasLimitNumbers(true)
      }
    }

    element.addEventListener('scroll', handleScroll)

    return () => element.removeEventListener('scroll', handleScroll)
  }, [tableRefNumbers.current])

  return (
    <div className='pb-9'>
      <div className='mx-10 pt-10'>
        <div className="u-container">
          <div className="pb-12">
            <p className="text-xl md:text-2xl font-semibold" style={{ color }}>
              Calculate the details
            </p>
          </div>
          <div className='text-2xl py-8 px-10 rounded-2xl shadow-lg' style={{ backgroundColor: hexRgb(color, { format: 'css', alpha: 0.05 }) }}>
            <h2 className="text-xl text-center">
              <OutcomeText data={data} color={color} showReturn={false} />
            </h2>
            <div className="mt-5 rounded-lg text-center">
              <p className="text-gray-2 text-center mt-3 text-lg lg:text-base">
                {data.general.return_description}
              </p>
            </div>
          </div>
        </div>
        <div className='overflow-hidden flex flex-col lg:flex-row gap-x-5'>
          <div className='space-y-16 lg:w-2/3 flex flex-col justify-between mt-16'>
            {/* TABLES */}
            {
              tables.map((table, i) =>
              (['economic_impact', 'social_impact', 'environmental_impact'].includes(table.id) ? (
                <Table
                  key={`table-${i + 1}`}
                  color={color}
                  data={table}
                  isLarge
                  count={i}
                  span={false}
                  data2={data}
                  isGeneric
                />
              ) : (
                <Table
                  key={`table-${i + 1}`}
                  color={color}
                  count={i}
                  data={table}
                />
              )
              ))
            }
          </div>
          <div className='flex flex-col gap-5 lg:w-1/3 mt-16'>
            <div className='relative'>
              <div ref={tableRefCosts} className='overflow-x-scroll lg:overflow-hidden rounded-2xl shadow'>
                <div className='w-[450px] lg:w-auto'>
                  <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
                    backgroundColor: isGeneric ? '#fff' : color
                  }}>
                    <div className='flex items-center gap-x-2'>
                      <h3 className='text-base lg:text-xl text-black font-medium'>What are the costs?</h3>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                    <div className="col-span-7">
                      <h4 className='text-gray-2 text-sm'>
                        Description
                      </h4>
                    </div>
                    <div className="col-span-5 pl-12">
                      <h4 className='text-gray-2 text-sm text-end'>
                        Value
                      </h4>
                    </div>
                  </div>
                  {
                    outputs.slice(0, 3).map((item, i) => (
                      <div key={i} className='grid pb-3 grid-cols-12 py-1 px-5 bg-white'>
                        <div className="col-span-7">
                          <h4 className='text-sm lg:text-base text-black'>
                            {item.description}
                          </h4>
                        </div>
                        <div className="col-span-5 pl-8">
                          <CurrencyInput className='w-full text-right border rounded-md border-black/30 p-1 inputclass' defaultValue={parseToNumber(item.value)} decimalsLimit={2} prefix='$' onValueChange={updateFieldChanged(i)} />
                        </div>
                      </div>
                    ))
                  }
                  <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimit, 'right-4': !hasLimit })}>
                    {'>'}
                  </div>
                  <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimit, 'left-4': hasLimit })}>
                    {'<'}
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div ref={tableRefNumbers} className='overflow-x-scroll lg:overflow-hidden rounded-2xl shadow mt-5'>
                <div className='w-[800px] lg:w-auto'>
                  <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
                    backgroundColor: isGeneric ? '#fff' : color
                  }}>
                    <div className='flex items-center gap-x-2'>
                      <h3 className='text-base lg:text-xl text-black font-medium'>What are the numbers?</h3>
                    </div>
                  </div>

                  <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                    <div className="col-span-7">
                      <h4 className='text-gray-2 text-sm'>
                        Description
                      </h4>
                    </div>
                    <div className="col-span-5 pl-12">
                      <h4 className='text-gray-2 text-sm text-end'>
                        Value
                      </h4>
                    </div>
                  </div>
                  {
                    outputs.slice(3, 23).map((item, i) => {
                      let config = {}

                      if (item.unit === 'currency') {
                        config = {
                          decimalsLimit: 2,
                          prefix: '$'
                        }
                      } else {
                        config = {
                          decimalsLimit: 2
                        }
                      }

                      return (
                        <div key={i} className='grid grid-cols-12 py-2 px-5 bg-white '>
                          <div className="col-span-7">
                            <h4 className='text-black'>
                              {item.description}
                            </h4>
                          </div>
                          <div className="col-span-5 pl-8">
                            <CurrencyInput className='w-full text-right border rounded-md border-black/30 p-1 inputclass' defaultValue={parseToNumber(item.value)} {...config} onValueChange={updateFieldChanged(i + 3)} />
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimitNumbers, 'right-4': !hasLimitNumbers })}>
                    {'>'}
                  </div>
                  <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimitNumbers, 'left-4': hasLimitNumbers })}>
                    {'<'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
