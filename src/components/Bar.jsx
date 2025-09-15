export const Bar = ({ barPercentage, base, min, max, name }) => {
    return (
        <div className="grid sm:grid-cols-[70%_auto] items-center gap-4 relative">
            <div className="h-10 relative">
                <span className="after:content-[''] block absolute inset-0 rounded-2xl bg-black/20"></span>
                <span className="before:content-[''] block absolute inset-0 rounded-2xl bg-primary-200" style={{ width: `${barPercentage}%` }}></span>
                <div className="px-3 grid grid-flow-col auto-cols-auto items-center gap-2 absolute inset-0">
                    <p className="col-span-10 font-bold text-secondary-200">{ base }</p>
                    <span className="col-span-1 text-center" >{min}</span>
                    <span className="col-span-1 text-center">{max}</span>
                </div>
            </div>
            <span className="row-start-1 sm:row-auto justify-self-center sm:justify-self-auto uppercase text-12">{name}</span>
        </div>
    )
}