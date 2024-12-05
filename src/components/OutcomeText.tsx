type Obj = Record<string, string | number>

interface OutcomeTextProps {
  data: Record<string, unknown>
  color: string
  showReturn?: boolean
  socialValue?: number
  socialValue2?: number
}

const OutcomeText = ({ data, color, socialValue, socialValue2, showReturn = true }: OutcomeTextProps) => {
  // @ts-ignore
  const ret = socialValue ? parseFloat(socialValue).toFixed(2) : parseFloat(data.general.return).toFixed(2)
  // @ts-ignore
  const ret2 = socialValue2 ? parseFloat(socialValue2).toFixed(2) : parseFloat(data.general.returnMin).toFixed(2)
  return (
    <>
      {
        (data.general as Obj).ranges === 'yes' ?
          <>
            For every <span className="font-semibold text-3xl" style={{ color }}> ${(data.general as Obj).invested}</span> invested, {(data.general as Obj).title} <br /> creates <span className="font-semibold text-3xl" style={{ color }}>${ret2} - ${ret.toString()} </span>{showReturn && (data.general as Obj).returnDescription}
        </>
        :
        <>
          For every <span className="font-semibold text-3xl" style={{ color }}> ${(data.general as Obj).invested}</span> invested, {(data.general as Obj).title} creates <span className="font-semibold text-3xl" style={{ color }}> ${ret.toString()} </span>{showReturn && (data.general as Obj).returnDescription}
        </>
    }
    </>
  )
}

export default OutcomeText
