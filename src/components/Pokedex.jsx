import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { usePokeapi } from "../hooks/usePokeapi";
import { TextWithRef } from "./Text";
import Card from "./Card";
import Pokeball from "./Pokeball";
import InfiniteScroll from "./InfiniteScroll";
import { Loading } from "./Loading";

function Pokedex() {
    const inputRef = useRef(null);
    
    const [data, setData] = useState([]);

    const { pokemons } = usePokeapi();
    const { state, all, filterPokemons } = pokemons;
    
    useEffect(() => {
        const pokemons = all();
        setData(pokemons);
    }, [state]);
    
    const handleChange = () => {
        const name = String(inputRef.current.value).toLowerCase();
        const pokemons = filterPokemons(name);
        setData(pokemons);
    }

    return (
        <>
            <TextWithRef
                ref={inputRef}
                label="Buscar pokemon?"
                className="text-secondary-100"
                onChange={handleChange}
            />
            <div className="pt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {data && data.map((record, index) => (
                            <Card key={index}>
                                <NavLink to={`pokemon/${record.name}`}>
                                    <img loading="lazy" src={record.sprite} alt={record.name} />
                                    <div className="grid grid-cols-[1fr_auto] text-primary-300">
                                        <span className="row-state-1 capitalize font-bold text-xs sm:text-sm text-16">{record.name}</span>
                                        <span className="row-start-2 text-xs text-16">Nº {record.number}</span>
                                        <Pokeball className="row-span-2 w-4 sm:w-8 h-full fill-primary-300"/>
                                    </div>
                                </NavLink>
                            </Card>
                        ))}
                    </div>
            </div>
        </>
    )
}

export default Pokedex;