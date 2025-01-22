import { useState, useEffect, useRef } from 'react';
import Table from './Table';
import classNames from 'classnames';
import { parseToNumber } from '../utils';
import CurrencyInput from 'react-currency-input-field';
import type { CurrencyInputProps } from 'react-currency-input-field'
import OutcomeText from './OutcomeText';
import hexRgb from 'hex-rgb';
import Mexp from 'math-expression-evaluator';
/* import { usePDF } from 'react-to-pdf'; */
/* const ReactToPDF = await import('react-to-pdf');
const { usePDF } = ReactToPDF; */
const mexp = new Mexp();

const safeEval = (expr: string) => {
  const lexed = mexp.lex(expr);
  const postfixed = mexp.toPostfix(lexed);
  return mexp.postfixEval(postfixed);
}

export default function Interactive({ top = "top-2/3", data, url }) {
  const color = data.general.theme
  const isGeneric = true
  const [values, setValues] = useState([...data.proxy_inputs, ...data.proxy_values])
  const [outputs, setOutputs] = useState(data.proxy_inputs)
  const [tables, setTables] = useState(data.tabs[0].tables)
  const [socialValue, setSocialValue] = useState(data.general.return)
  const [socialValue2, setSocialValue2] = useState(data.general.returnMin)
  const tableRefCosts = useRef<HTMLDivElement>()
  const tableRefNumbers = useRef<HTMLDivElement>()
  const [hasLimit, setHasLimit] = useState(false)
  const [hasLimitNumbers, setHasLimitNumbers] = useState(false)
  const [prev, setPrev] = useState(0)
  const [link, setLink] = useState('')
  /* const { toPDF, targetRef } = usePDF({
    filename: 'calculator-results.pdf',
    page: {
      margin: 20,
      format: 'letter',
      orientation: 'portrait'
    }
  }); */
  const contentRef = useRef(null);

  const getCurrencyInputConfig = (item) => {
    const config: CurrencyInputProps = { decimalsLimit: 2, allowNegativeValue: false, step: 1 }

    if (item.unit === 'currency') {
      config.prefix = '$'
    }
    if (item.unit === 'percentage') {
      config.suffix = '%'
    }

    return config
  }

  const handleFieldChange = (value: string, index: string, unit: string, min = false) => {
    let parsedValue = parseToNumber(value)
    if (unit === 'percentage') {
      parsedValue = parsedValue / 100
    }

    if (min) {
      setOutputs(prevState => {
        const i = prevState.findIndex(el => el.id === index)
        prevState[i].valueMin = parsedValue
        return [...prevState]
      })
    } else {
      setOutputs(prevState => {
        const i = prevState.findIndex(el => el.id === index)
        prevState[i].value = parsedValue
        return [...prevState]
      })
    }

    if (parsedValue !== prev) {
      updateTable()
    }

    // @pipeleon ¿Esto no debería ser actualizado solo parsedValue !== prev?
    setPrev(parsedValue)
  }

  const updateTable = (change = true) => {
    let social = 0
    let social2 = 0

    const update = tables.map(tbl => {
      const totalValue = tbl.rows.reduce((total, row) => {
        const vars = row.variables.split(',').map(v => v.trim())
        const fx = vars.reduce((fx, v) => {
          const value = values.find(item => item.id === v)?.value
          return fx.replaceAll(v, value)
        }, row.formula)
        const prevValue = row.value
        const result = safeEval(fx)
        row.value = result
        row.formula_str = `${fx} = ${result}`
        if (change) {
          row.changed = prevValue !== result
        }
        return total + result
      }, 0)
      tbl.totalValue = totalValue
      social += totalValue
      if (tbl.ranges) {
        const totalValue2 = tbl.rows.reduce((total, row) => {
          const vars = row.valueMin ? row.variables2.split(',').map(v => v.trim()) : row.variables.split(',').map(v => v.trim())
          const fx = vars.reduce((fx, v) => {
            const tmp = values.find(item => item.id === v)
            const value = tmp?.ranges ? tmp?.valueMin : tmp?.value
            return fx.replaceAll(v, value)
          }, (row.valueMin ? row.formula2 : row.formula))
          const prevValue = row.valueMin ? row.valueMin : row.value
          const result = safeEval(fx)
          if (row.valueMin) {
            row.valueMin = result
          } else {
            row.value = result
          }
          return total + result
        }, 0)
        tbl.totalValueMin = totalValue2
        social2 += totalValue2
      } else {
        social2 += totalValue
      }
      return tbl
    })

    const div_formula = data.general.formula

    const fg = data.general.variables.split(',').map(v => v.trim()).reduce((fg, v) => {
      const value = values.find(item => item.id === v)?.value
      return fg.replaceAll(v, value)
    }, div_formula)

    const formula = fg.replaceAll('SUM(proxies)', social)
    const formula2 = fg.replaceAll('SUM(proxies)', social2)

    const result = safeEval(formula)
    const result2 = safeEval(formula2)

    setSocialValue(result)
    setSocialValue2(result2)
    setTables(update)
  }

  const generateLink = () => {
    const params = new URLSearchParams();

    outputs.forEach(item => {
      params.append(item.id, item.value.toString());
      if (item.ranges) {
        params.append(`m_${item.id}`, item.valueMin.toString());
      }
    });

    setLink(`${window.location.hostname}${window.location.pathname}?tab=tab2&${params.toString()}#tabs`);
  }

  const handleDownload = async () => {
    const element = contentRef.current;
    const opt = {
      margin: [10, 10], // [top/bottom, left/right] en mm
      filename: 'calculator-results.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { 
        scale: 1, // Reducido de 2 a 1.5 para menor tamaño
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'letter', 
        orientation: 'portrait'
      },
      // Añadimos estilos CSS personalizados
      pagebreak: { mode: 'avoid-all' }
    };

    // Aplicar estilos temporales para el PDF
    if (element) {
      const originalFontSize = element.style.fontSize;
      element.style.fontSize = '0.85em'; // Reducir tamaño de fuente
      
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set(opt).from(element).save();
      
      // Restaurar el tamaño de fuente original
      element.style.fontSize = originalFontSize;
    }
  };

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

  useEffect(() => {
    const params = new URLSearchParams(url);
    const tmp = [...outputs];
    params.forEach((value, key) => {
      if (key !== 'tab') {
        if (key.startsWith('m_')) {
          const i = tmp.findIndex(el => el.id === key.replace('m_', ''))
          if (i !== -1) {
            tmp[i].valueMin = parseFloat(value)
          }
        }
        else {
          const i = tmp.findIndex(el => el.id === key)
          if (i !== -1) {
            tmp[i].value = parseFloat(value)
          }
        }
      }
    })
    setOutputs(tmp)

    updateTable(false)
  }, [url]);

  return (
    <div className='pb-9'>
      <div className='mx-10 pt-10' ref={contentRef}>
        <div className="u-container">
          <div className="pb-12">
            <p className="text-xl md:text-2xl font-semibold" style={{ color }}>
              Calculate the details
            </p>
          </div>
          <div className='text-2xl py-8 px-10 rounded-2xl shadow-lg' style={{ backgroundColor: hexRgb(color, { format: 'css', alpha: 0.05 }) }}>
            <h2 className="text-xl text-center">
              <OutcomeText data={data} color={color} showReturn={false} socialValue={socialValue} socialValue2={socialValue2} />
            </h2>
            <div className="mt-5 rounded-lg text-center">
              <p className="text-gray-2 text-center mt-3 text-lg lg:text-base">
                {data.general.returnDescription}
              </p>
            </div>
          </div>
        </div>
        <div className='overflow-hidden flex flex-col lg:flex-row gap-x-5'>
          <div className='space-y-16 lg:w-2/3 flex flex-col justify-between mt-16'>
            {/* TABLES */}
            {
              tables.map((table, i) =>
              (<Table
                key={`table-${i + 1}`}
                color={color}
                data={table}
                isLarge
                count={i}
                span={false}
                data2={data}
                isGeneric
              />
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
                    outputs.filter(out => out.type === 'cost').map((item, i) => (
                      <div key={`output-${i}`} className='grid pb-3 grid-cols-12 py-1 px-5 bg-white'>
                        <div className="col-span-7">
                          <h4 className='text-sm lg:text-base text-black'>
                            {item.description}
                          </h4>
                        </div>
                        <div className="col-span-5 pl-8">
                          <div className='flex items-center gap-x-2 justify-end'>
                            {item.ranges && <p className={classNames('text-xs lg:text-sm text-right', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>[high]</p>}
                            <CurrencyInput
                              className='w-full text-right border rounded-md border-black/30 p-1 inputclass'
                              value={item.unit === 'percentage' ? parseToNumber(item.value) * 100 : parseToNumber(item.value)}
                              onValueChange={(value) => handleFieldChange(value, item.id, item.unit)}
                              {...getCurrencyInputConfig(item)}
                            />
                          </div>
                          {
                            item.ranges &&
                            <div className='flex items-center gap-x-2 justify-end'>
                              <p className={classNames('text-xs lg:text-sm text-right', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>[high]</p>
                              <CurrencyInput
                                className='w-full text-right border rounded-md border-black/30 p-1 inputclass'
                                value={item.unit === 'percentage' ? parseToNumber(item.valueMin) * 100 : parseToNumber(item.valueMin)}
                                onValueChange={(value) => handleFieldChange(value, item.id, item.unit, true)}
                                {...getCurrencyInputConfig(item)}
                              />
                            </div>
                          }
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
                    outputs.filter(out => out.type !== 'cost').map((item, i) => (
                      <div key={`another-outputs-${i}`} className='grid grid-cols-12 py-2 px-5 bg-white '>
                        <div className="col-span-7">
                          <h4 className='text-black'>
                            {item.description}
                          </h4>
                        </div>
                        <div className="col-span-5 pl-8">
                          <div className='flex items-center gap-x-2 justify-end'>
                            {item.ranges && <p className={classNames('text-xs lg:text-sm text-right', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>[high]</p>}
                            <CurrencyInput
                              className='w-full text-right border rounded-md border-black/30 p-1 inputclass'
                              value={item.unit === 'percentage' ? parseToNumber(item.value) * 100 : parseToNumber(item.value)}
                              onValueChange={(value) => handleFieldChange(value, item.id, item.unit)}
                              {...getCurrencyInputConfig(item)}
                            />
                          </div>
                          {
                            item.ranges &&
                            <div className='flex items-center gap-x-2 justify-end'>
                              <p className={classNames('text-xs lg:text-sm text-right', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>[low]</p>
                              <CurrencyInput
                                className='w-full text-right border rounded-md border-black/30 p-1 inputclass'
                                value={item.unit === 'percentage' ? parseToNumber(item.valueMin) * 100 : parseToNumber(item.valueMin)}
                                onValueChange={(value) => handleFieldChange(value, item.id, item.unit, true)}
                                {...getCurrencyInputConfig(item)}
                              />
                            </div>
                          }
                        </div>
                      </div>
                    ))
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
      <div className='flex justify-end  mx-10 gap-5'>
        <div className='w-2/3'></div>
        <div className='py-5 px-5 bg-white rounded-2xl shadow mt-5 w-1/3'>
          <h3 className='text-xl font-medium'>Share</h3>
          <p>Share or save your content</p>
          <button onClick={generateLink} className='flex items-center gap-x-2 w-full py-2 px-4 rounded-lg justify-center mt-3' style={{ backgroundColor: hexRgb(color, { format: 'css', alpha: 0.05 }), border: `1px solid ${color}`, color: color }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.0002 11C13.5707 10.4259 13.0228 9.95081 12.3936 9.60706C11.7645 9.2633 11.0687 9.05888 10.3535 9.00766C9.63841 8.95645 8.92061 9.05963 8.24885 9.31021C7.5771 9.5608 6.96709 9.95293 6.4602 10.46L3.4602 13.46C2.54941 14.403 2.04544 15.666 2.05683 16.977C2.06822 18.288 2.59407 19.542 3.52111 20.4691C4.44815 21.3961 5.70221 21.922 7.01319 21.9334C8.32418 21.9448 9.58719 21.4408 10.5302 20.53L12.2402 18.82" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.0002 11C13.5707 10.4259 13.0228 9.9508 12.3936 9.60704C11.7645 9.26328 11.0687 9.05886 10.3535 9.00765C9.63841 8.95643 8.92061 9.05961 8.24885 9.3102C7.5771 9.56079 6.96709 9.95291 6.4602 10.46L3.4602 13.46C2.54941 14.403 2.04544 15.666 2.05683 16.977C2.06822 18.288 2.59407 19.542 3.52111 20.4691C4.44815 21.3961 5.70221 21.922 7.01319 21.9334C8.32418 21.9447 9.58719 21.4408 10.5302 20.53L12.2402 18.82" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Generate link
          </button>
          <div className='w-full border border-black/30 rounded-lg relative my-3 px-2 py-1.5'>
            <input type="text" value={link} className='w-full border-black' />
            <button disabled={!link} onClick={() => navigator.clipboard.writeText(link)} className='absolute right-0 top-[1px] rounded-lg px-2 py-1'
              style={{ backgroundColor: link ? hexRgb(color, { format: 'css', alpha: 0.99 }) : 'grey', border: `1px solid white`, color: 'white' }}>
              Copy
            </button>
          </div>

          <div className='flex items-center gap-x-2'>
            <div className='w-full h-[1px] bg-black/30'></div>
            <p className='text-black/30'>Or</p>
            <div className='w-full h-[1px] bg-black/30'></div>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-x-2 w-full py-2 px-4 rounded-lg justify-center hover:text-white mt-5"
            style={{ backgroundColor: hexRgb(color, { format: 'css', alpha: 0.05 }), border: `1px solid ${color}`, color: color }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 11L12 17L18 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 21H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
