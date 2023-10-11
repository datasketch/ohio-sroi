import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import hexRgb from 'hex-rgb';
import { valueFormat } from '../utils/functions'

export default function TableAccordion({ color = '#00694E', setIsOpen, rows }) {
    const rgb = hexRgb(color, { format: 'array', alpha: 0.1 })
    const rgba = `rgba(${rgb.join(', ')})`

    // HANDLERS
    const getDataState = (e) => {
        const isOpen = e.target.closest('.AccordionTrigger').getAttribute('data-state') !== 'open'
        setIsOpen(isOpen)
    }

    return (
        <Accordion.Root type="single" collapsible>
            {
                rows && rows.map((item, i) => (
                    <Accordion.Item key={i} className='AccordionItem' value={`item-${i}`}>
                        <Accordion.Header className='AccordionHeader' style={{ color: rgb, backgroundColor: rgba, borderColor: color }}>
                            <div className="col-span-3">
                                <h4 className='text-sm truncate lg:text-base text-black'>
                                    {item.stakeholders}
                                </h4>
                            </div>
                            <div className="col-span-7">
                                <h4 className='text-sm truncate lg:text-base text-black'>
                                    {item.outcomes}
                                </h4>
                            </div>
                            <div className="col-span-2 flex items-center gap-x-8">
                                <div className='w-6/12'>
                                    <h4 className='text-sm font-semibold text-black text-right'>
                                        ${valueFormat(item.value)}
                                    </h4>
                                </div>
                                <div className='6/12'>
                                    <Accordion.Trigger onClick={(e) => getDataState(e)} className="AccordionTrigger" style={{ backgroundColor: color }}>
                                        <ChevronRightIcon className="AccordionChevron" aria-hidden />
                                    </Accordion.Trigger>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className="AccordionContent" style={{ backgroundColor: rgba, borderColor: color }}>
                            <div className='AccordionContentChildren' style={{ borderColor: color }}>
                                <div className="col-span-3">
                                    <p className='text-black text-sm'>
                                        How do we calculate this?
                                    </p>
                                </div>
                                <div className="col-span-7">
                                    <div className='space-y-4'>
                                        {item.rows?.outcomes.map((item, i) => {
                                            return (
                                                <p key={`outcomes-${i + 1}`} className='text-black text-sm'>
                                                    {item}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className='space-y-4'>
                                        {item.rows?.value.map((v, i) => {
                                            return (
                                                <p key={`value-${i + 1}`} className='text-sm font-semibold -translate-x-20 text-right'>
                                                    {valueFormat(v)}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
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
                                        {item.formula}
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