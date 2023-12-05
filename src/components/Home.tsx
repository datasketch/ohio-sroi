import CardAmount from "./CardAmount";
import TabSection from "./TabSection";

const data = await fetch('./data/format.json').then((response) =>
  response.json()
);

export default function Home() {
  const url = window.location.search
  const color = data.general.theme

  return (
    <>
      <div className="relative">
        <div className="-mt-20 lg:-mt-32 u-container bg-white">
          <div className="py-12">
            <div className="mx-auto max-w-4xl">
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
              <div className="hidden lg:block mb-16">
                <div className="flex items-center justify-between gap-16">
                  <div className="flex-shrink-0">
                    <img src={data.general.logo} alt={data.general.title} />
                  </div>
                  <div className="text-center">
                    <h1>For every
                      <span className="font-semibold text-3xl" style={{ color }}> ${data.statistics_section.invested} </span>
                      invested in {data.general.title} creates <span className="font-semibold text-3xl" style={{ color }}> ${data.statistics_section.return} </span>{data.statistics_section.description}</h1>
                  </div>
                </div>
              </div>
              <img src="/images/home.svg" alt="" />
              <div className="flex items-center justify-between mt-16">
                <h3>{data.general.subtitle}</h3>
                <img src="/images/logo-5.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div >
      <div id='tabs'>
        <TabSection color={data.general.theme} tabs={data.tabs} url={url} data={data} />
      </div>
      <div className='u-container py-16 flex gap-x-16 items-center'>
        <img src="./images/div2.svg" alt="" />
        <p className="text-sm lg:text-base">
          {data.general.description}
        </p>
      </div>
    </>
  )
}
