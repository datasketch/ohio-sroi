import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import hexRgb from 'hex-rgb';
import { formatAs, valueFormat } from '../utils';
import classNames from 'classnames';

export default function TableAccordion({ color = '#00694E', setIsOpen, rows, span = true, data, groupByStakeholders, id}) {
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
          <Accordion.Item key={`acc-item-${i}-${item.stakeholders}-${id}`} className='AccordionItem' value={`item-${i}`}>
            <Accordion.Header className='AccordionHeader py-4' style={{ color: `rgb(${rgb.slice(0, 3).join(',')})`, backgroundColor: rgba, borderColor: color }}>
              <div className={classNames('', { 'col-span-2': !span, 'col-span-2 px-0': span })}>
                <h4 className='text-sm lg:text-base text-black'>
                  {groupByStakeholders ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : item.stakeholders}
                </h4>
              </div>
              <div className={classNames({ 'col-span-7': !span, 'col-span-7 px-0': span })}>
                <h4 className='text-sm lg:text-base text-black'>
                  {item.description}
                </h4>
              </div>
              <div className={classNames('flex items-center gap-x-8', { 'col-span-3': !span, 'col-span-3 px-0': span })}>
                <div className='w-10/12'>
                  {
                    item.valueMin ?
                      <div className='flex flex-col gap-y-1'>
                        <div className='flex items-center gap-x-2 justify-end '>
                          <p className='text-xs text-black'>[high]</p>
                          <h4 className={classNames('text-sm font-semibold text-black text-right', item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : '')}>
                            $ {valueFormat(item.value)}
                          </h4>
                        </div>
                        <div className='flex items-center gap-x-2 justify-end '>
                          <p className='text-xs text-black'>[low]</p>
                          <h4 className={classNames('text-sm font-semibold text-black text-right', item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : '')}>
                            $ {valueFormat(item.valueMin)}
                          </h4>
                        </div>
                      </div>
                      :
                      <h4 className={classNames('text-sm font-semibold text-black text-right', item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : '')}>
                        $ {valueFormat(item.value)}
                      </h4>
                  }

                </div>
                <div className='w-2/12 flex justify-end'>
                  <Accordion.Trigger onClick={(e) => getDataState(e)} className="AccordionTrigger" style={{ backgroundColor: color }} aria-label={`${item.stakeholders} details`}>
                    <ChevronRightIcon className="AccordionChevron" aria-hidden />
                  </Accordion.Trigger>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Content className="AccordionContent" style={{ backgroundColor: rgba, borderColor: color }}>
              <div className='AccordionContentChildren' style={{ borderColor: color }}>
                {
                  item.rows.map((item, j) => {
                    return (
                      <>
                        <div key={`outcomes-${i + 1}-1-${id}-${j}`} className={classNames('py-2', { 'col-span-2': !span, 'col-span-2 px-0': span })}>
                          {j === 0 && <p className='text-black text-sm'>
                            How do we calculate this?
                          </p>}
                        </div>
                        <div key={`outcomes-${i + 1}-2-${id}-${j}`} className={classNames({ 'col-span-7 py-2': !span, 'col-span-7 px-0 py-2': span })}>
                          {item?.ref ?
                            <>
                              <p key={`outcomes-${j + 1}`} className='text-black text-sm'>
                                {item?.description}{" "}
                                <a key={`outcomess-${j + 1}`} href={`/${data.general.organization}/${data.general.database}/?tab=tab3#tabs`} target="_blank" className='text-[#A4D65E] underline'>{item?.ref}</a></p>
                            </> :
                            <p key={`outcomes-${j + 1}`} className='text-black text-sm'>
                              {item?.description}
                            </p>
                          }
                        </div>
                        {
                          item.ranges ?
                            <div key={`outcomes-${i + 1}-3-${id}-${j}`} className={classNames('text-sm font-semibold -translate-x-20 text-right py-2', { 'col-span-3': !span, 'col-span-3 px-0': span })}>
                              {formatAs(item?.valueMin, item?.unit)} - {formatAs(item?.value, item?.unit)}
                            </div>
                            :
                            <div key={`outcomes-${i + 1}-3-${id}-${j}`} className={classNames('text-sm font-semibold -translate-x-20 text-right py-2', { 'col-span-3': !span, 'col-span-3 px-0': span })}>
                              {formatAs(item?.value, item?.unit)}
                            </div>

                        }
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
