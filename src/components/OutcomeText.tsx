type Obj = Record<string, string | number>

interface OutcomeTextProps {
  data: Record<string, unknown>
  color: string
  showReturn?: boolean
  socialValue?: number
}

const OutcomeText = ({ data, color, socialValue, showReturn = true }: OutcomeTextProps) => {
  // @ts-ignore
  const ret = socialValue ? socialValue.toFixed(2) : data.general.return.toFixed(2)
  return (
    <>
      For every <span className="font-semibold text-3xl" style={{ color }}> ${(data.general as Obj).invested}</span> invested, {(data.general as Obj).title} creates <span className="font-semibold text-3xl" style={{ color }}> ${ret} </span>{showReturn && (data.general as Obj).return_description}
    </>
  )
}

export default OutcomeText
