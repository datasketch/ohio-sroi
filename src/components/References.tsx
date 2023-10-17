
export default function References({ list }) {
  return (
    <div>
        <ul className="list-disc space-y-10">
            {list.map((item, i) => {
                return(<li key={i}><a href={item.href}>{item.title}</a></li>)
            })}
        </ul>
    </div>
  )
}
