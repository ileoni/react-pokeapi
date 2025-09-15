import { Bar } from "./Bar";
import RechartsRadar from "../components/RechartsRadar";

function Status({ stats }) {
    const acronym = { hp: "HP", attack: "ATK", defense: "DEF", "special-attack": "SP.ATK", "special-defense": "SP.DEF", speed: "SPD"};
    const expressionOfBase = ({base, max}) => (base / max) * 100;

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-4">
                {stats && stats.map((stat, index) => <Bar key={index} barPercentage={expressionOfBase(stat)} base={stat.base} max={stat.max} min={stat.min} name={stat.name}/>)}
            </div>
            <div className="hidden sm:block justify-self-end w-96">
                {stats && <RechartsRadar data={stats.map(stat => ({ ...stat, name: acronym[stat.name]}))}/>}
            </div>
        </div>
    )
}

export default Status;