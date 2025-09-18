import { useConfigs } from "../hooks/useConfigs";

function ProgressBar({ type, name }) {
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
            <span className="before:content-[''] block absolute inset-0 rounded-full bg-secondary-100/10"></span>
            <span 
                className="after:content-[''] block absolute inset-0 rounded-full"
                style={{
                    background: type.value === 1 ? "": `color-mix(in srgb, var(--color-${name}) 60%, transparent)`,
                    width: type.value > 1 ? "100%": `${type.value * 100}%`
                }}
            ></span>
            <div className="px-4 grid grid-flow-col justify-between items-center gap-2 absolute inset-0 uppercase text-xs text-secondary-100">
                <span>{useConfigs(`types.${name}.value`)}</span>
                <span>{adjustedValue(type.value)}</span>
            </div>
        </div>
    )
}

export default ProgressBar;