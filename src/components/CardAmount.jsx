import Modal from "../components/Modal";
import { Tooltip } from 'react-tooltip'

export default function CardAmount({ color = '#00694E', title, amount, cardAmount }) {
    return (
        <div className="bg-robin-egg-blue/5 py-8 px-10">
            <h2 className="text-2xl text-center">
                For every
                <span className="font-semibold" style={{ color }}> ${amount}</span>
                <br />
                {title}
            </h2>
            <div
                className="mt-9 rounded-lg text-center"
            >
                <div className="flex justify-center text-2xl gap-x-2">
                    <p>{cardAmount.title}</p>
                    <button className="tooltip-rev2">
                        <img src="/images/icons/information-generic-icon.svg" alt="information icon" />
                    </button>
                </div>
                <p className="text-2xl font-semibold mt-1" style={{ color }}>
                    $ {cardAmount.amount}
                </p>
                <div className="bg-silver h-[0.5px] mt-5"></div>
                <p className="text-gray-2 text-center mt-3 text-lg lg:text-2xl">
                    {cardAmount.formula}
                </p>
                <Modal
                    color={color}
                    amount={cardAmount.amount}
                    title={cardAmount.title}
                    description={cardAmount.information}
                />
                <Tooltip anchorSelect=".tooltip-rev2" place="right" style={{ width: "250px" }}>
                    Social value includes both financial and non-financial impacts of a program, activity, or organization. For the purposes of this calculator, social value is understood to encompass social, environmental, and economic impacts.
                </Tooltip>
            </div>
        </div>
    )
}