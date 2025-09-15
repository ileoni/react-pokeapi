import Height from "./Height";

const Card = ({ data, self }) => {
    const sameName = data.name === self.name;

    const props = {
        style: {
            height: `${data.height.percentageOfEachHeight}%`
        }
    }
    
    return (  
        <div className="grid grid-flow-col grid-cols-[auto_auto_1fr] items-center gap-4">
            <span className="font-extrabold">{data.height.value}</span>
            <Height {...props}/>
            <div {...props} className="relative">
                <span className="after:content-[''] grid place-content-center absolute inset-0 font-extrabold text-xl">{data.weight}</span>
                <img src={data.sprite} alt={data.name} className={`justify-self-center h-full brightness-0 opacity-${sameName ? "30": "15"}`}/>
            </div>
        </div>
    )
}

function Evolutions({ evolution, self }) {
    return (
        <div className="grid sm:grid-flow-col">
            {evolution?.map((pokemon, index) => <Card key={index} data={pokemon} self={self}/>)}
        </div>
    )
}

export default Evolutions;