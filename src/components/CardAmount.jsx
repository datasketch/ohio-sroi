import Modal from "../components/Modal";

export default function CardAmount({ color = '#00694E', title, amount, cardAmount }) {
    return (
        <div>
            <h2 className="text-2xl text-center">
                For every
                <span className="font-semibold" style={{ color }}> ${amount}</span>
                <br />
                {title}
            </h2>
            <div
                className="mt-9 bg-robin-egg-blue/5 py-8 px-10 rounded-lg text-center"
            >
                <p>{cardAmount.title}</p>
                <p className="text-3xl font-semibold mt-1" style={{ color }}>
                    $ {cardAmount.amount}
                </p>
                <div className="bg-silver h-[0.5px] mt-5"></div>
                <p className="text-gray-2 text-center mt-3 text-sm">
                    {cardAmount.formula}
                </p>
                <Modal
                    color={color}
                    amount={cardAmount.amount}
                    title={cardAmount.title}
                    description={cardAmount.information}
                />
            </div>
        </div>
    )
}