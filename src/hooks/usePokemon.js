import { useQuery } from "@apollo/client"
import { GET_POKEMON } from "../configs/queries";
import { useCallback, useEffect, useState } from "react";
import { useStatus } from "./useStatus";
import { useSpecies } from "./useSpecies";
import { useType } from "./useType";

export const usePokemon = ({ name }) => {
    const [state, setState] = useState(null);

    const { data, loading } = useQuery(GET_POKEMON, { variables: { name } });

    useEffect(() => {
        if(!loading) setState(data.pokeapi);
    }, [loading])

    const { stats } = useStatus({ data: state?.stats });
    const { text, evolutions } = useSpecies({ data: state?.species });
    const { types, damageRelations } = useType({ data: state?.type });

    const getPokedexNumber = (value) => String(value).padStart(4, "0000");

    const getSprite = (sprites) => sprites?.other['official-artwork'].front_default;

    const sanitizeData = (data) => {
        return {
            damageRelations,
            evolutions,
            id: data?.id,
            name: data?.name,
            number: getPokedexNumber(data?.id),
            stats,
            sprite: getSprite(data?.sprites),
            text,
            types
        }
    }

    const getPokemon = useCallback(() => sanitizeData(state), [state]);

    return {
        getPokemon
    }
}