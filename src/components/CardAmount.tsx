import Modal from "../components/Modal";
import { Tooltip } from 'react-tooltip'

export default function CardAmount({ color = '#00694E', title, amount, cardAmount }) {
    return (
        <div className="bg-robin-egg-blue/5 py-8 px-10">
            <h2 className="text-xl text-center">
                For every
                <span className="font-semibold text-3xl" style={{ color }}> ${amount}</span>
                <br />
                {title}
            </h2>
            <div
                className="mt-9 rounded-lg text-center"
            >
                <div className="flex justify-center text-2xl gap-x-2">
                    <p className="text-3xl font-semibold mt-1" style={{ color }}>
                        $ {cardAmount.return}
                    </p>
                    <button className="tooltip-rev2">
                        <img src="/images/icons/information-generic-icon.svg" alt="information icon" />
                    </button>
                </div>
                <div className="bg-silver h-[0.5px] mt-5"></div>
                <p className="text-gray-2 text-center mt-3 text-lg lg:text- xl">
                    {cardAmount.description}
                </p>
                <Modal
                    color={color}
                    amount={cardAmount.return}
                    title={cardAmount.label}
                    description={cardAmount.information}
                />
                <Tooltip anchorSelect=".tooltip-rev2" place="right" style={{ width: "200px" }}>
                    {cardAmount.tooltip}
                </Tooltip>
            </div>
        </div>
    )
}