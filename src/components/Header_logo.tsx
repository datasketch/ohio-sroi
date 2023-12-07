
const data = await fetch('./data/format.json').then((response) =>
  response.json()
);

export default function Header_logo() {
  return (
    <div className="u-container">
      <div className="block lg:hidden">
        <div className="py-6">
          <img className="w-24 h-9" src={data.general.top_logo} alt="logo" />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="py-7 px-11 absolute bg-darmouth-green">
          <img className="w-24 h-9" src={data.general.top_logo} alt="logo" />
        </div>
      </div>
    </div>
  )
}
