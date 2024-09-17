import { useEffect, useState } from "react";
import OutcomeText from "./OutcomeText";
import TabSection from "./TabSection";

export default function Home({ data }) {
  const [url, setURL] = useState('')
  const color = data.general.theme

  useEffect(() => {
    setURL(window.location.search)
  }, [])


  return (
    <>
      <div className="relative">
        <div className="-mt-20 lg:-mt-32 u-container bg-white">
          <div className="py-12">
            <div className="mx-auto max-w-4xl">
              <div className="mb-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                  <div className="flex-shrink-0">
                    <img src={data.general.logo} alt={data.general.title} />
                  </div>
                  <div className="text-center text-xl">
                    <h1>
                      <OutcomeText data={data} color={color} />
                    </h1>
                  </div>
                </div>
              </div>
              <img src={data.general.banner} alt="" />
              <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mt-16">
                <h2>{data.general.subtitle}</h2>
                <img src={`${import.meta.env.BASE_URL}/images/logo-5.svg`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='tabs'>
        <TabSection color={data.general.theme} tabs={data.tabs} url={url} data={data} />
      </div>
      <div className='u-container py-16 flex gap-x-16 items-center'>
        <img src={`${import.meta.env.BASE_URL}/images/div2.svg`} alt="" />
        <p className="text-sm lg:text-base">
          {data.general.description}
        </p>
      </div>
    </>
  )
}
