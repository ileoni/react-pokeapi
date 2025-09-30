import { usePokemon } from "./usePokemon";
import { usePokemons } from "./usePokemons";

export const usePokeapi = (name = "") => {
    const pokemons = usePokemons();
    const pokemon = usePokemon({ name });

    return {
        pokemons,
        pokemon
    }
}