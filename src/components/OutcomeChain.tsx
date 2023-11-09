
export default function OutcomeChain({ title, graphs }) {
    return (
        <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="mt-20 space-y-12 md:space-y-24 lg:space-y-32 xl:space-y-48">
                {
                    graphs.map((graph, i) => {
                        return (
                            <div key={`graph-${i + 1}`}>
                                <img src={graph} alt={`graph-${i + 1}`} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
