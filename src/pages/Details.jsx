import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";
import Row from "../components/Row";
import { H4 } from "../components/H4";
import { H1 } from "../components/H1";
import Pokeball from "../components/Pokeball";
import { Pill } from "../components/Pill";
import Status from "../components/Status";
import TypesOfWeakness from "../components/TypesOfWeakness";
import Evolutions from "../components/Evolutions";
import EvolutionChain from "../components/EvolutionChain";

function Details() {
    const { name } = useParams();
    
    const { getPokemon } = usePokemon({ name });

    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        const pokemon = getPokemon();
        setPokemon(pokemon);
    }, [getPokemon])

    return (
        <>
        <Row>
            <Row.MaxW5xl className="grid sm:grid-cols-2 items-center">
                <div className="grid gap-4">
                    <H4 className="grid grid-flow-col justify-center sm:justify-start items-center gap-4 text-primary-300">
                        Nº {pokemon?.number} <Pokeball className="w-6 h-6 fill-primary-300"/>
                    </H4>
                    <H1 className="capitalize font-bold leading-none text-center sm:text-left">{pokemon?.name}</H1>
                    <p className="text-center sm:text-left">{pokemon?.text}</p>
                    <div className="grid grid-flow-col justify-center sm:justify-start gap-4">
                        {pokemon?.types && pokemon?.types.map((type, index) => <Pill key={index} type={type.name}/>)}
                    </div>
                </div>
                <img src={pokemon?.sprite} alt={pokemon?.name} className="justify-self-center sm:justify-self-end row-start-2 sm:row-start-auto w-56 sm:w-96"/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-500">
            <Row.SpikesTop className="fill-base-600"/>
            <Row.MaxW5xl className="grid gap-4">
                <H4 className="text-center sm:text-left">Estátisticas</H4>
                <Status stats={pokemon?.stats}/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-400">
            <Row.SpikesTop className="fill-base-500"/>
            <Row.MaxW5xl className="grid gap-4">
                <H4 className="text-center sm:text-left">Fraquezas</H4>
                <TypesOfWeakness damageRelations={pokemon?.damageRelations}/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-300">
            <Row.SpikesTop className="fill-base-400"/>
            <Row.MaxW5xl>
                <H4 className="text-center sm:text-left">Evoluções - Peso e Altura</H4>
                <Evolutions evolution={pokemon?.evolutions} self={pokemon} />
            </Row.MaxW5xl>
        </Row>
        <Row.Background>
            <Row.SpikesTop className="fill-base-300"/>
            <Row.MaxW5xl>
                <EvolutionChain data={pokemon?.evolutions}/>
            </Row.MaxW5xl>
        </Row.Background>
        </>
    )
}

export default Details;