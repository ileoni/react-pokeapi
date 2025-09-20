import { useCallback } from "react";
import { useFlavorTextEntries } from "./useFlavorTextEntries";

export const useSpecies = ({ data }) => {
    const { text } = useFlavorTextEntries({ data: data?.flavor_text_entries });

    const onlyEvolutions = (record, evolutions = []) => {
        const { evolves_to: [ evolvesTo ], species } = record;

        evolutions.push(species.pokemon);
        if(evolvesTo != undefined) onlyEvolutions(evolvesTo, evolutions);

        return evolutions
    }

    const getPokedexNumber = (value) => String(value).padStart(4, "0000");

    const getSprite = (sprites) => sprites?.other['official-artwork'].front_default;

    const sanitizeData = (data, last) => {
        const size = Math.floor((data?.height / last.height) * 100);

        const height = {
            cm: `${data?.height * 10} cm`,
            m: `${data?.height / 10} M`,
            original: data?.height,
        }

        const types = data?.types.flatMap(({type}) => ({ name: type.name }));

        const weight = data?.weight / 10;

        return {
            height: {
                value: height.original < 10 ? height.cm: height.m,
                size: size
            },
            id: data?.id,
            name: data?.name,
            number: getPokedexNumber(data?.id),
            sprite: getSprite(data?.sprites),
            types,
            weight: `${weight} KG`
        }
    }

    const sanitizeEvolutions = (data) => {
        if(data) {
            const evolutionChain = onlyEvolutions(data?.evolution_chain?.evolution?.chain);
            const [ lastEvolution ] = evolutionChain.slice(-1);
            return evolutionChain.map(pokemon => sanitizeData(pokemon, lastEvolution))
        }
    }

    const getEvolutions = useCallback(() => sanitizeEvolutions(data), [data]);
    
    return {
        text,
        evolutions: getEvolutions()
    }
}