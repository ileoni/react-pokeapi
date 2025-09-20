import { useConfigs } from "../hooks/useConfigs";
import { Bar } from "./Bar";
import Radar from "./Radar";

function Status({ stats }) {
    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-4">
                {stats && stats.map((stat, index) => (
                    <Bar
                        key={index}
                        barPercentage={stat.bar}
                        base={stat.base}
                        max={stat.max}
                        min={stat.min}
                        name={useConfigs(`stats.${stat?.name}`)?.value}
                    />
                ))}
            </div>
            <div className="hidden sm:block justify-self-end w-96">
                {stats && (
                    <Radar data={stats.map(stat => ({ ...stat, name: useConfigs(`stats.${stat?.name}`)?.acronym }))}/>
                )}
            </div>
        </div>
    )
}

export default Status;