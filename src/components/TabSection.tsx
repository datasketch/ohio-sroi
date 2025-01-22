import * as Tabs from '@radix-ui/react-tabs';
import Table from './Table';
import Interactive from './Interactive'
import OutcomeChain from './OutcomeChain';
import References from './References';
import * as Switch from '@radix-ui/react-switch';
import { useState, useEffect } from 'react';


export default function TabSection({ color = '#00694E', tabs, url, data }) {
  const [currentTab, setCurrentTab] = useState('');
  const [show, setShow] = useState(false);
  const [groupByStakeholders, setGroupByStakeholders] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(url);
    const newTab = params.get("tab") ? params.get("tab") : "tab1";
    const newShow = params.get("display") !== "false";
    
    setCurrentTab(newTab);
    setShow(newShow);
  }, [url]);

  const handleGroupByStakeholders = () => {
    setGroupByStakeholders(!groupByStakeholders)
  }

  return (
    // TAB PARENT
    <Tabs.Root 
      value={currentTab}
      orientation="horizontal"
      onValueChange={(value) => setCurrentTab(value)}
    >
      {/* TABS CHILDREN */}
      <Tabs.List className='u-container flex' aria-label="tabs">
        {
          tabs.map(({ label }, i) => {
            if (label == "Program Details") {
              if (show) {
                return (
                  <Tabs.Trigger key={`tab-trigger-${i + 1}`} value={`tab${i + 1}`} className="TabsTrigger" style={{ color }}>{label}</Tabs.Trigger>
                )
              }

            } else {
              return (
                <Tabs.Trigger key={`tab-trigger-${i + 1}`} value={`tab${i + 1}`} className="TabsTrigger" style={{ color }}>{label}</Tabs.Trigger>
              )
            }
          })
        }
      </Tabs.List>
      {/* TABS CONTENT */}
      {
        tabs.map((item, i) => {
          return (
            <Tabs.Content key={`tab-content-${i + 1}`} className='bg-anti-flash-white ' value={`tab${i + 1}`} >

              {
                item.type === 'table' && (
                  <div className='pt-12 pb-9 relative'>
                    {data.general.bg_image1 && <img src={`${data.general.bg_image1}`} alt="bg" className='absolute right-0 max-w-[400px] opacity-40 -z-0' />}
                    {data.general.bg_image2 && <img src={`${data.general.bg_image2}`} alt="bgh" className='absolute bottom-0 max-w-[400px] opacity-40 -z-0'  />}
                    <div className='u-container'>
                      <div className="flex items-center justify-between pb-12">
                        <p className="text-xl md:text-2xl font-semibold" style={{ color }}>
                          Look at the details
                        </p>
                        <div className='flex items-center gap-2 z-10 '>
                          <label htmlFor="">Group by Stakeholders</label>
                          <Switch.Root
                            checked={groupByStakeholders}
                            onCheckedChange={handleGroupByStakeholders}
                            className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
                            id="airplane-mode"
                          >
                            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                          </Switch.Root>
                        </div>
                      </div>
                      <div className='space-y-12'>
                        {/* TABLES */}
                        {
                          item[groupByStakeholders ? 'tables_stakeholders' : 'tables'].map((table, i) => {
                            return (
                              <Table key={`table-${i + 1}-${table.id}`} color={color} data={{ ...table }} isLarge count={i} data2={data} groupByStakeholders={groupByStakeholders}  />
                            )
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
                      <References list={item.list} />
                    </div>
                  </div>
                )
              }
              {
                item.type === 'interactive' && show && (
                  <Interactive data={JSON.parse(JSON.stringify(data))} url={url}/>
                )
              }
            </Tabs.Content>
          )
        })
      }
    </Tabs.Root>
  )
}
