import { useContext } from "react";

import Introduction from "./introduction";
import Pokedex from "./Pokedex";
import WhosThatPokemon from "./WhosThatPokemon";

import { AppContext } from "../../contexts/app-context";

function Home()
{
    const { pokemons } = useContext(AppContext);

    return (
        <>
            <Introduction/>
            {
                pokemons.length > 0 && (
                    <>
                        <Pokedex pokemons={pokemons} />
                        <WhosThatPokemon pokemons={pokemons}/>
                    </>
                )
            }
        </>
    );
}

export default Home;