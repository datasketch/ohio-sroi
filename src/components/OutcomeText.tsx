type Obj = Record<string, string | number>

interface OutcomeTextProps {
  data: Record<string, unknown>
  color: string
  showReturn?: boolean
}

const OutcomeText = ({ data, color, showReturn = true }: OutcomeTextProps) => {
  return (
    <>
      For every <span className="font-semibold text-3xl" style={{ color }}> ${(data.general as Obj).invested}</span> invested, {(data.general as Obj).title} creates <span className="font-semibold text-3xl" style={{ color }}> ${(data.general as Obj).return} </span>{showReturn && (data.general as Obj).return_description}
    </>
  )
}

export default OutcomeText
