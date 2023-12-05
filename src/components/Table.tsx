import classNames from 'classnames';
import TableAccordion from './TableAccordion';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { formatAs, valueFormat } from '../utils';

export default function Table({ color, data, isLarge, top = "top-2/3", count, span = true, data2 }) {
  const [isOpen, setIsOpen] = useState(false)
  const isGeneric = color === '#00694E'
  const hasRow = !!data.rows
  const anchor = `.tooltip-value${count}`
  const tableRef = useRef()
  const [hasLimit, setHasLimit] = useState(false)


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

  if (isLarge) {
    return (
      <div className='rounded-2xl overflow-hidden shadow relative'>
        {/* HEADING */}
        <div className='pt-5 pb-2.5 pl-5 pr-4' style={{
          backgroundColor: isGeneric ? '#fff' : color
        }}>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between'>
            <div className='flex items-center gap-x-2'>
              <h3 className={classNames('text-base lg:text-xl', { 'text-white': !isGeneric, 'text-black': isGeneric })}>{data.title}
                {hasRow && (
                  <button className={`pl-1 tooltip-value${count}`}>
                    {!isGeneric && (<img src="./images/icons/information-icon.svg" alt="information icon" />)}
                    {isGeneric && (<img src="./images/icons/information-generic-icon.svg" alt="information icon" />)}
                  </button>
                )}
              </h3>
            </div>
            {
              hasRow && (
                <div className='flex md:justify-end justify-between items-center gap-x-4'>
                  <p className={classNames('text-xs lg:text-sm', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>
                    Total Value
                  </p>
                  <div className={classNames('bg-white rounded py-0.5 px-5')} >
                    <p className='text-base lg:text-xl'>$ {valueFormat(data.totalValue)}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {/* ROW SUB HEADING */}
        {hasRow && (
          <>
            <div ref={tableRef} className='overflow-x-scroll lg:overflow-hidden'>
              <div className='w-[1000px] lg:w-auto'>
                <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                  <div className={classNames('', { 'col-span-2': !span, 'col-span-3': span })}>
                    <h4 className='text-gray-2 text-xs lg:text-sm'>
                      Who is impacted?
                    </h4>
                  </div>
                  <div className="col-span-7">
                    <h4 className='text-gray-2 text-xs lg:text-sm'>
                      What changed?
                    </h4>
                  </div>
                  <div className={classNames('pl-12', { 'col-span-3': !span, 'col-span-2': span })}>
                    <h4 className='text-gray-2 text-xs lg:text-sm flex gap-1'>
                      Value <img className={`value${count}`} src="./images/icons/information-generic-icon.svg" alt="information icon" />
                    </h4>
                  </div>
                </div>
                {(data.id === 'economic_impact' || data.id === 'social_impact' || data.id === 'environmental_impact') && <TableAccordion setIsOpen={setIsOpen} color={color} rows={data.rows} span={span} data={data2} />}
              </div>
              <Tooltip anchorSelect={`.value${count}`} place="right" style={{ width: "250px", color: "black", background: "white"}} className='text-blue-400'>
                The values listed below are fiscal proxies, which are monetary representations of impacts for which there is no set market value. Fiscal proxies often take the form of costs avoided or benefits achieved.
              </Tooltip>
            </div>
          </>
        )}
        {
          !hasRow && (
            <div className='py-4 px-5 bg-white'>
              <p className="text-gray-2 text-sm">
                None at this time
              </p>
            </div>
          )
        }
        <Tooltip anchorSelect={anchor} place="right" style={{ width: "250px", color: "black", background: "white" }}>
          {data.tooltip}
        </Tooltip>
        <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-right-full': hasLimit, 'right-4': !hasLimit })}>
          {'>'}
        </div>
        <div className={classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { '-left-full': !hasLimit, 'left-4': hasLimit })}>
          {'<'}
        </div>
      </div>
    )
  } else {
    return (
      <div className='rounded-2xl overflow-hidden'>
        {/* HEADING */}
        <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
          backgroundColor: isGeneric ? '#fff' : color
        }}>
          <div>
            <h3 className={classNames('text-xl', { 'text-white': !isGeneric, 'text-black': isGeneric })}>{data.title}</h3>
          </div>
        </div>
        {/* ROW SUB HEADING */}
        <div className='flex justify-between items-center bg-white pt-5 pb-1.5 pl-5 pr-8'>
          <div>
            <h4 className='text-gray-2 text-sm'>
              Description
            </h4>
          </div>
          <div>
            <h4 className='text-gray-2 text-sm'>
              Value
            </h4>
          </div>
        </div>
        <div className='bg-white pb-10 pl-5 pr-8'>
          {
            data.rows.map(({ description, value, unit }, i) => {
              return (
                <div key={`row-${i + 1}`} className='flex items-center justify-between border-b-[0.5px] border-b-silver py-1'>
                  <p className='text-black'>
                    {description}
                  </p>
                  <p className='text-sm font-semibold text-black'>
                    {value}
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
