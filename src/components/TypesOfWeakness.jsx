import { Star } from "lucide-react";


function Pill({ type }) {
    const props = {
        [`data-${type.name}`]: ""
    }

    const beforeStyle = {
        background: type.value === 1 ? "": "var(--color-" + type.name + ")",
        width: type.value > 1 ? "100%": `${type.value * 100}%`
    }

    const adjustedValue = (value) => {
        if(value === 0.25) return "1/4";
        if(value === 0.5) return "1/2";
        if(value === 1) return "";
        if(value === 2) return <span className="text-lg">{value}</span>;
        if(value === 4) return <span className="grid grid-flow-col items-center text-xl animate-pulse">{value}</span>;
        return value;
    }

    return (
        <div className="h-10 relative">
            <span className="after:content-[''] block absolute inset-0 rounded-full bg-black/20"></span>
            <span className="before:content-[''] block absolute inset-0 rounded-full" style={beforeStyle}></span>
            <div {...props} className={`px-4 grid grid-flow-col justify-between items-center gap-2 absolute inset-0 font-bold text-xs text-white`}>
                <span>{type.name}</span>
                <span>{adjustedValue(type.value)}</span>
            </div>
        </div>
    )
}

function TypesOfWeakness({ damageRelations }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {damageRelations?.map((type, key) => (
                <Pill key={key} type={type}/>
            ))}
        </div>
    )
}

export default TypesOfWeakness;