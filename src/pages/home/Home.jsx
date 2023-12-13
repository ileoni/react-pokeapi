import { useEffect, useState } from "react";

import Introduction from "./introduction";
import Pokedex from "./Pokedex";
import WhosThatPokemon from "./WhosThatPokemon";

import { findPokemonByName, getPokemons } from "../../services/HomeService";

function Home()
{
    const [loading, isLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons()
            .then(setPokemons)
            .then(_ => isLoading(false))
    }, [])

    return (
        <>
            <Introduction/>
            {
                pokemons && (
                    <>
                        <Pokedex pokemons={pokemons} loading={loading}/>
                        <WhosThatPokemon pokemons={pokemons}/>
                    </>
                )
            }
        </>
    );
}

export default Home;