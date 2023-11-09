import CardAmount from "./CardAmount";
import TabSection from "./TabSection";

const data = await fetch('/data/format.json').then((response) =>
  response.json()
);

export default function Home() {
  const url = window.location.search

  return (
    <>
      <div className="relative">
        <div className="-mt-20 lg:-mt-32 u-container bg-white">
          <div className="py-12">
            <div className="mx-auto max-w-xl">
              <div className="block lg:hidden">
                <div className="flex flex-col items-center justify-between">
                  <div className="text-center">
                    <h2 className="text-base lg:text-xl">{data.general.subtitle}</h2>
                    <h1
                      className="font-monserrat font-semibold text-2xl lg:text-3xl pt-3"
                    >
                      {data.general.title}
                    </h1>
                  </div>
                  <div className="flex-shrink-0 mt-10">
                    <img src={data.general.logo} alt={data.general.title} />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <img src={data.general.logo} alt={data.general.title} />
                  </div>
                  <div className="text-center">
                    <h2 className="text-base lg:text-xl">{data.general.subtitle}</h2>
                    <h1
                      className="font-monserrat font-semibold text-2xl lg:text-3xl pt-3"
                    >
                      {data.general.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray h-[1px] max-w-[936px] mx-auto mt-8 lg:mt-12 px-9">
            </div>
            <div className="mt-10 lg:mt-14">
              <div className="flex flex-col lg:gap-x-28 items-center">
                <div className="px-5 lg:w-1/2">
                  <CardAmount
                    title={data.statistics_section.title}
                    amount={data.statistics_section.invested}
                    cardAmount={data.statistics_section}
                    color={data.general.theme}
                  />
                </div>
                <div className="mt-14 lg:w-1/2">
                  <img
                    src={data.statistics_section.src_graph}
                    alt={data.statistics_section.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='tabs'>
        <TabSection color={data.general.theme} tabs={data.tabs} url={url} data={data} />
      </div>
      <div className='u-container py-16 flex gap-x-16 items-center'>
        <img src="/images/idea 1.svg" alt="" />
        <img src="/images/div2.svg" alt="" />
        <p className="text-sm lg:text-base">
          {data.general.description}
        </p>
      </div>
    </>
  )
}