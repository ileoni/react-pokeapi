import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { H4 } from "../components/H4";
import { H1 } from "../components/H1";
import { Pill } from "../components/Pill";
import { Loading } from "../components/Loading";
import { usePokeapi } from "../hooks/usePokeapi";
import Row from "../components/Row";
import Status from "../components/Status";
import Pokeball from "../components/Pokeball";
import Evolutions from "../components/Evolutions";
import EvolutionChain from "../components/EvolutionChain";
import TypesOfWeakness from "../components/TypesOfWeakness";

function Details() {
    const { name } = useParams();

    const [data, setData] = useState();

    const { pokemon } = usePokeapi(name);
    const { getPokemon, loading } = pokemon;

    useEffect(() => {
        const pokemon = getPokemon();
        setData(pokemon);
    }, [getPokemon])
    
    return (
        <Loading loading={loading}>
            <Row>
                <Row.MaxW5xl className="grid sm:grid-cols-2 items-center">
                    <div className="grid gap-4">
                        <H4 className="grid grid-flow-col justify-center sm:justify-start items-center gap-4 text-primary-300">
                            Nº {data?.number} <Pokeball className="w-6 h-6 fill-primary-300"/>
                        </H4>
                        <H1 className="capitalize font-bold leading-none text-center sm:text-left">{data?.name}</H1>
                        <p className="text-center sm:text-left">{data?.text}</p>
                        <div className="grid grid-flow-col justify-center sm:justify-start gap-4">
                            {data?.types && data?.types.map((type, index) => <Pill key={index} type={type.name}/>)}
                        </div>
                    </div>
                    <img src={data?.sprite} alt={data?.name} className="justify-self-center sm:justify-self-end row-start-2 sm:row-start-auto w-56 sm:w-96"/>
                </Row.MaxW5xl>
            </Row>
            <Row className="bg-base-500">
                <Row.SpikesTop className="fill-base-600"/>
                <Row.MaxW5xl className="grid gap-4">
                    <H4 className="text-center sm:text-left">Estátisticas</H4>
                    <Status stats={data?.stats}/>
                </Row.MaxW5xl>
            </Row>
            <Row className="bg-base-400">
                <Row.SpikesTop className="fill-base-500"/>
                <Row.MaxW5xl className="grid gap-4">
                    <H4 className="text-center sm:text-left">Fraquezas</H4>
                    <TypesOfWeakness damageRelations={data?.damageRelations}/>
                </Row.MaxW5xl>
            </Row>
            <Row className="bg-base-300">
                <Row.SpikesTop className="fill-base-400"/>
                <Row.MaxW5xl>
                    <H4 className="text-center sm:text-left">Evoluções - Peso e Altura</H4>
                    <Evolutions evolution={data?.evolution?.original} self={data} />
                </Row.MaxW5xl>
            </Row>
            <Row.Background>
                <Row.SpikesTop className="fill-base-300"/>
                <Row.MaxW5xl>
                    <EvolutionChain data={data?.evolution?.reordered} self={data}/>
                </Row.MaxW5xl>
            </Row.Background>
        </Loading>
    )
}

export default Details;