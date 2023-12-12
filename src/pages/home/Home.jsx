import { useEffect, useState } from "react";

import Introduction from "./introduction";
import Pokedex from "./Pokedex";
import WhosThatPokemon from "./WhosThatPokemon";

import { findPokemonByName, getPokemons } from "../../services/HomeService";

function Home()
{
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {getPokemons().then(setPokemons)}, [])

    return (
        <>
            <Introduction/>
            {
                pokemons && (
                    <>
                        <Pokedex pokemons={pokemons}/>
                        <WhosThatPokemon pokemons={pokemons}/>
                    </>
                )
            }
        </>
    );
}

export default Home;