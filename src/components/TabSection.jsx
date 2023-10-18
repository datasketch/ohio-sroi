import * as Tabs from '@radix-ui/react-tabs';
import Table from './Table';
import Interactive from './Interactive'
import OutcomeChain from './OutcomeChain';
import References from './References';


export default function TabSection({ color = '#00694E', tabs }) {
    return (
        // TAB PARENT
        <Tabs.Root defaultValue="tab1" orientation="vertical">
            {/* TABS CHILDREN */}
            <Tabs.List className='u-container flex' aria-label="tabs">
                {
                    tabs.map(({ label }, i) => {
                        return (
                            <Tabs.Trigger key={`tab-trigger-${i + 1}`} value={`tab${i + 1}`} className="TabsTrigger" style={{ color }}>{label}</Tabs.Trigger>
                        )
                    })
                }
            </Tabs.List>
            {/* TABS CONTENT */}
            {
                tabs.map((item, i) => {
                    return (
                        <Tabs.Content key={`tab-content-${i + 1}`} className='bg-anti-flash-white' value={`tab${i + 1}`}>
                            {
                                item.type === 'table' && (
                                    <div className='pt-12 pb-9'>
                                        <div className='u-container'>
                                            <div className='space-y-12'>
                                                {/* TABLES */}
                                                {
                                                    item.tables.map((table, i) => {
                                                        if (table.id === 'economic_impact' || table.id === 'social_impact' || table.id === 'environmental_impact') {
                                                            return (
                                                                <Table key={`table-${i + 1}`} color={color} data={table} isLarge count={i} />
                                                            )
                                                        } else {
                                                            return (
                                                                <Table key={`table-${i + 1}`} color={color} data={table} count={i} />
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                item.type === 'outcome_chain' && (
                                    <div className='pt-20 pb-36'>
                                        <div className='u-container'>
                                            <OutcomeChain title={item.title} graphs={item.graphs} />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                item.type === 'references' && (
                                    <div className='py-12 lg:py-16 xl:py-20'>
                                        <div className='u-container'>
                                            <References list={item.list}/>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                item.type === 'interative' && (
                                    <Interactive />
                                )
                            }
                        </Tabs.Content>
                    )
                })
            }
        </Tabs.Root>
    )
}