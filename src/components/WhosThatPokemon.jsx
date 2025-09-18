import { useEffect, useMemo, useRef, useState } from "react";

import { useApiPokemon } from "../hooks/useApiPokemon";
import { Text, TextWithRef } from "./Text";
import { KEY_ENTER } from "../constants";

function WhosThatPokemon() {
    const inputRef = useRef(null);

    const [pokemon, setPokemon] = useState();

    const { getRandomPokemon, sameName, state } = useApiPokemon();

    useEffect(() => {
        const record = getRandomPokemon();
        setPokemon(record);
    }, [state])

    const cleanup = () => {
        inputRef.current.value = "";
    }
    
    const correctAnswer = () => {
        const record = getRandomPokemon();
        setPokemon(record);
        cleanup();
    }

    const cheking = (id, name) => {
        sameName(id, name) ? correctAnswer(): null;
    }

    const handleKeyDown = (e) => {
        if(e.key === KEY_ENTER) {
            const id = pokemon.id;
            const name = String(inputRef.current.value).toLowerCase();
            cheking(id, name);
        }
    }

    return (
        <>
            <TextWithRef
                ref={inputRef}
                label="Quem é esse pokémon?"
                className="text-secondary-200"
                onKeyDown={handleKeyDown}
            />
            <div className="py-8 sm:py-0 justify-self-center sm:justify-self-end">
                {pokemon && <img src={pokemon.sprite} alt="pikachu" className="w-56 sm:w-72"/>}
            </div>
        </>
    )
}

export default WhosThatPokemon;