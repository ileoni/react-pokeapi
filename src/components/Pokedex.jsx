import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { TextWithRef } from "./Text";
import { useApiPokemon } from "../hooks/useApiPokemon";
import Card from "./Card";
import Pokeball from '../components/Pokeball';
import InfiniteScroll from "./InfiniteScroll";

function Pokedex() {
    const inputRef = useRef(null);

    const [pokemons, setPokemons] = useState([]);

    const { state, all, filterPokemons, reachedMaximumLength, updateFetch } = useApiPokemon();
    
    useEffect(() => {
        const pokemons = all()
        setPokemons(pokemons);
    }, [state]);
    
    const handleChange = () => {
        const name = String(inputRef.current.value).toLowerCase();
        const pokemons = filterPokemons(name);
        setPokemons(pokemons);
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
                <InfiniteScroll 
                    intersectionObserverCallback={updateFetch}
                    reachedMaximumLength={reachedMaximumLength}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {pokemons && pokemons.map((pokemon, index) => (
                            <Card key={index}>
                                <NavLink to={`pokemon/${pokemon.name}`}>
                                    <img src={pokemon.sprite} alt={pokemon.name} />
                                    <div className="grid grid-cols-[1fr_auto] text-primary-300">
                                        <span className="row-state-1 capitalize font-bold text-xs sm:text-sm text-16">{pokemon.name}</span>
                                        <span className="row-start-2 text-xs text-16">Nº {pokemon.number}</span>
                                        <Pokeball className="row-span-2 w-4 sm:w-8 h-full fill-primary-300"/>
                                    </div>
                                </NavLink>
                            </Card>
                        ))}         
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Pokedex;