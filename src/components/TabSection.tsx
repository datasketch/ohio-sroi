import * as Tabs from '@radix-ui/react-tabs';
import Table from './Table';
import Interactive from './Interactive'
import OutcomeChain from './OutcomeChain';
import References from './References';


export default function TabSection({ color = '#00694E', tabs, url, data }) {
  const searchParams = new URLSearchParams(url)
  const tab = searchParams.get("query") === "ref" ? "tab3" : "tab1"
  const show = searchParams.get("display") !== "false"


  return (
    // TAB PARENT
    <Tabs.Root defaultValue={tab} orientation="horizontal">
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
                    <img src={`${import.meta.env.BASE_URL}/images/bg-dashboard.svg`} alt="bg" className='absolute right-0' />
                    <img src={`${import.meta.env.BASE_URL}/images/bg-botton.svg`} alt="bgh" className='absolute bottom-0' />
                    <div className='u-container'>
                      <div className="flex items-center justify-start pb-12">
                        <p className="text-xl md:text-2xl font-semibold" style={{ color }}>
                          Look at the details
                        </p>
                      </div>
                      <div className='space-y-12'>
                        {/* TABLES */}
                        {
                          item.tables.map((table, i) => {
                            return (
                              <Table key={`table-${i + 1}`} color={color} data={{ ...table }} isLarge count={i} data2={data} />
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
                  <Interactive data={JSON.parse(JSON.stringify(data))} />
                )
              }
            </Tabs.Content>
          )
        })
      }
    </Tabs.Root>
  )
}
