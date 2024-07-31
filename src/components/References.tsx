
export default function References({ list }) {
  return (
    <div>
      <ul className="list-disc space-y-10 text-sm lg:text-base pl-12 pr-9 lg:pl-40 lg:pr-36">
        {list.map((item, i) => {
          return (<li key={`ref-${i}`}><a href={item.href}>{item.title}</a></li>)
        })}
      </ul>
    </div>
  )
}
