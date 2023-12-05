import { useEffect, useState } from "react";

import { getAll, getByName, randomPokemon } from '../../services/PokeapiService';
import Introduction from "./introduction";
import Pokedex from "./Pokedex";
import WhosThatPokemon from "./WhosThatPokemon";

function Home()
{
    const [pikachu, setPokemon] = useState({});
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getByName('pikachu')
            .then(setPokemon);

        getAll(12)
            .then(setPokemons);
    }, []);

    return (
        <>
            <Introduction pokemon={pikachu}/>
            <Pokedex list={pokemons}/>
            {
                !!pokemons.length && (<WhosThatPokemon pokemons={pokemons}/>)
            }
        </>
    );
}

export default Home;