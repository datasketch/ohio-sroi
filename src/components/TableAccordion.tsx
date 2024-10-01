import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import hexRgb from 'hex-rgb';
import { formatAs, valueFormat } from '../utils';
import classNames from 'classnames';

export default function TableAccordion({ color = '#00694E', setIsOpen, rows, span = true, data, groupByStakeholders }) {
  const rgb = hexRgb(color, { format: 'array', alpha: 0.1 })
  const rgba = `rgba(${rgb.join(', ')})`


  // HANDLERS
  const getDataState = (e) => {
    const isOpen = e.target.closest('.AccordionTrigger').getAttribute('data-state') !== 'open'
    setIsOpen(isOpen)
  }

  const addingRows = () => {
    const values = [...data.proxy_inputs, ...data.proxy_values]
    rows = rows.map((item) => {
      const vars = item.variables.split(",")
      let temp = item.formula
      for (let variable of vars) {
        temp = temp.replaceAll(variable, values.find(ele => ele.id === variable)?.value)
      }
      item.formula_str = `${temp} = ${item.value}`
      const vars2 = vars.map((variable) => {
        const description = values.find(v => v.id === variable)
        return description
      })
      item.rows = vars2
      return item
    })
  }

  addingRows()

  return (
    <Accordion.Root type="single" collapsible>
      {
        rows && rows.map((item, i) => (
          <Accordion.Item key={`acc-item-${i}-${item.stakeholders}`} className='AccordionItem' value={`item-${i}`}>
            <Accordion.Header className='AccordionHeader py-4' style={{ color: `rgb(${rgb.slice(0, 3).join(',')})`, backgroundColor: rgba, borderColor: color }}>
              <div className={classNames('', { 'col-span-2': !span, 'col-span-3': span })}>
                <h4 className='text-sm lg:text-base text-black'>
                  {groupByStakeholders ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : item.stakeholders}
                </h4>
              </div>
              <div className="col-span-7">
                <h4 className='text-sm lg:text-base text-black'>
                  {item.description}
                </h4>
              </div>
              <div className={classNames('flex items-center gap-x-8', { 'col-span-3': !span, 'col-span-2': span })}>
                <div className='w-9/12'>
                  <h4 className={classNames('text-sm font-semibold text-black text-right', item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : '')}>
                    $ {valueFormat(item.value)}
                  </h4>
                </div>
                <div className='w-3/12'>
                  <Accordion.Trigger onClick={(e) => getDataState(e)} className="AccordionTrigger" style={{ backgroundColor: color }} aria-label={`${item.stakeholders} details`}>
                    <ChevronRightIcon className="AccordionChevron" aria-hidden />
                  </Accordion.Trigger>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Content className="AccordionContent" style={{ backgroundColor: rgba, borderColor: color }}>
              <div className='AccordionContentChildren' style={{ borderColor: color }}>
                {
                  item.rows.map((item, i) => {
                    return (
                      <>
                        <div className={classNames('py-2', { 'col-span-2': !span, 'col-span-3': span })}>
                          {i === 0 && <p className='text-black text-sm'>
                            How do we calculate this?
                          </p>}
                        </div>
                        <div className="col-span-7 py-2">
                          {item?.ref ?
                            <>
                              <p key={`outcomes-${i + 1}`} className='text-black text-sm'>
                                {item?.description}
                                <a key={`outcomess-${i + 1}`} href="/?query=ref#tabs" target="_blank" className='text-[#A4D65E] underline'>{item?.ref}</a></p>
                            </> :
                            <p key={`outcomes-${i + 1}`} className='text-black text-sm'>
                              {item?.description}
                            </p>
                          }
                        </div>
                        <div className={classNames('text-sm font-semibold -translate-x-20 text-right py-2', { 'col-span-3': !span, 'col-span-2': span })}>
                          {formatAs(item?.value, item?.unit)}
                        </div>
                      </>
                    )
                  })
                }
                {/* <div className={classNames('', { 'col-span-2': !span, 'col-span-3': span })}>
                  <p className='text-black text-sm'>
                    How do we calculate this?
                  </p>
                </div>
                <div className="col-span-7">
                  <div className='space-y-4'>
                    {item.rows?.map((item, i) => {
                      if (item?.ref) {
                        return (
                          <>
                            <p key={`outcomes-${i + 1}`} className='text-black text-sm'>
                              {item?.description}
                              <a key={`outcomess-${i + 1}`} href="/?query=ref#tabs" target="_blank" className='text-[#A4D65E] underline'>{item?.ref}</a></p>
                          </>
                        )
                      }
                      return (
                        <p key={`outcomes-${i + 1}`} className='text-black text-sm'>
                          {item?.description}
                        </p>
                      );

                    })}
                  </div>
                </div>
                <div className={classNames('', { 'col-span-3': !span, 'col-span-2': span })}>
                  <div className='space-y-4'>
                    {item.rows?.map((v, i) => {
                      return (
                        <p key={`value-${i + 1}`} className='text-sm font-semibold -translate-x-20 text-right'>
                          {formatAs(v?.value, v?.unit)}
                        </p>
                      );
                    })}
                  </div>
                </div> */}
              </div>
              <div className='flex flex-row justify-between border-t-[0.5px] py-4 pr-20' style={{ borderColor: rgba }}>
                <div className="col-span-3">
                  <p className='text-gray-2 text-sm'>
                    Formula
                  </p>
                </div>
                <div className="col-span-6">
                  <p className='text-black text-sm'>
                    &nbsp;
                  </p>
                </div>
                <div className="col-span-3">
                  <p className='text-gray-2 text-sm'>
                    {item.formula_str}
                  </p>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))
      }
    </Accordion.Root>
  )
}
