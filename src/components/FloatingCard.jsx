import { useEffect, useState } from "react";

import { useEvolutionChain } from "../hooks/useEvolutionChain";
import Pokeball from "./Pokeball";
import { Pill } from "./Pill";

function FloatingCard() {
    const [record, setRecord] = useState();

    const { records, currentIndex } = useEvolutionChain();

    useEffect(() => {
        setRecord(records[currentIndex]);
    }, [records, currentIndex])

    return (
        <div className="before:content-[''] grid grid-flow-row grid-rows-[auto_auto_1fr] sm:grid-rows-none auto-rows-min gap-4 absolute inset-0">
            <div className="grid grid-flow-col justify-start items-center gap-4 text-white">
                <span>N° {record?.number}</span>
                <Pokeball className="size-4 fill-white"/>
            </div>
            <span className="capitalize text-2xl text-white">{record?.name}</span>
            <div className="grid grid-flow-col justify-center sm:justify-start gap-4">
                {record?.types?.map((type, index) => (
                    <Pill key={index} type={type.name}/>
                ))}
            </div>
        </div>
    )
}

export default FloatingCard;