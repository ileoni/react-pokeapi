import { useEffect, useRef, useState } from "react";

import { usePokeapi } from "../hooks/usePokeapi";
import { TextWithRef } from "./Text";
import { Loading } from "./Loading";

function WhosThatPokemon() {
    const inputRef = useRef(null);

    const [data, setData] = useState();

    const { pokemons } = usePokeapi();
    const { getRandomPokemon, sameName, state } = pokemons;
    
    useEffect(() => {
        const record = getRandomPokemon();
        setData(record);
    }, [state])


    const cleanup = () => inputRef.current.value = "";
    
    const correctAnswer = () => {
        const record = getRandomPokemon();
        setData(record);
        cleanup();
    }

    const cheking = (id, name) => {
        sameName(id, name) ? correctAnswer(): null;
    }

    const handleKeyDown = (e) => {
        if(e.key === KEY_ENTER) {
            const id = data.id;
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
                {data && <img src={data.sprite} alt="pikachu" className="w-56 sm:w-72"/>}
            </div>
        </>
    )
}

export default WhosThatPokemon;