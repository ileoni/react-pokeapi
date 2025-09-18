import { useConfigs } from "../hooks/useConfigs";
import ProgressBar from "./ProgressBar";

function TypesOfWeakness({ damageRelations }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {damageRelations?.map((type, key) => (
                <ProgressBar key={key} type={type} name={type.name}/>
            ))}
        </div>
    )
}

export default TypesOfWeakness;