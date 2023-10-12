import classNames from 'classnames';
import TableAccordion from './TableAccordion';
import { useState } from 'react';
import { valueFormat } from '../utils/functions'
import { Tooltip } from 'react-tooltip'

export default function Table({ color, data, isLarge }) {
    const [isOpen, setIsOpen] = useState(false)
    const isGeneric = color === '#00694E'
    const hasRow = !!data.rows
    const anchor = `.${data.tooltip}`
    if (isLarge) {
        return (
            <div className='rounded-2xl overflow-hidden shadow'>
                {/* HEADING */}
                <div className='pt-5 pb-2.5 pl-5 pr-8' style={{
                    backgroundColor: isGeneric ? '#fff' : color
                }}>
                    <div className='flex flex-col lg:flex-col items-center justify-between'>
                        <div className='flex items-center gap-x-2'>
                            <h3 className={classNames('text-base lg:text-xl', { 'text-white': !isGeneric, 'text-black': isGeneric })}>{data.title}</h3>
                            {hasRow && (
                                <button className={data.tooltip}>
                                    {!isGeneric && (<img src="/images/icons/information-icon.svg" alt="information icon" />)}
                                    {isGeneric && (<img src="/images/icons/information-generic-icon.svg" alt="information icon" />)}
                                </button>
                            )}
                        </div>
                        {
                            hasRow && (
                                <div className='flex items-center justify-between gap-x-4'>
                                    <p className={classNames('text-xs lg:text-sm', { 'text-white': !isGeneric, 'text-gray-2': isGeneric })}>
                                        Total Value
                                    </p>
                                    <div className={classNames('bg-white rounded py-0.5 px-5', { 'border': isGeneric })} style={{ borderColor: color }}>
                                        <p className='text-base lg:text-xl'><span className='text-black'>$</span>{valueFormat(data.totalValue)}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* ROW SUB HEADING */}
                {hasRow && (
                    <>
                        <div className='overflow-x-scroll lg:overflow-hidden'>
                            <div className='w-[1000px] lg:w-auto'>
                                <div className='grid grid-cols-12 py-1 px-5 bg-white'>
                                    <div className="col-span-3">
                                        <h4 className='text-gray-2 text-xs lg:text-sm'>
                                            Who is impacted?
                                        </h4>
                                    </div>
                                    <div className="col-span-7">
                                        <h4 className='text-gray-2 text-xs lg:text-sm'>
                                            What changed?
                                        </h4>
                                    </div>
                                    <div className="col-span-2 pl-12">
                                        <h4 className='text-gray-2 text-xs lg:text-sm flex gap-1'>
                                            Value <img className='tooltip-rev' src="/images/icons/information-generic-icon.svg" alt="information icon" />
                                        </h4>
                                    </div>
                                </div>
                                {(data.type === 'economic_impact' || data.type === 'social_impact' || data.type === 'environmental_impact') && <TableAccordion setIsOpen={setIsOpen} color={color} rows={data.rows} />}
                            </div>
                            <Tooltip anchorSelect=".tooltip-rev" place="right" style={{ width: "250px" }}>
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
                <Tooltip anchorSelect={anchor} place="right" style={{ width: "250px" }}>
                    {data.tooltipText}
                </Tooltip>
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
                        data.rows.map(({ description, value }, i) => {
                            return (
                                <div key={`row-${i + 1}`} className='flex items-center justify-between border-b-[0.5px] border-b-silver py-1'>
                                    <p className='text-black'>
                                        {description}
                                    </p>
                                    <p className='text-sm font-semibold text-black'>
                                        ${valueFormat(value)}
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