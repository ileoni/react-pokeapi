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

    const sanitizeData = (data, lastHeight) => {
        const size = Math.floor((data?.height / lastHeight) * 100);
        
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

    const reorder = (data, name) => {
        const currentIndex = data.findIndex(record => record.name == name);
        const left = data.slice(currentIndex);
        const right = data.slice(0, currentIndex);
        return [...left, ...right];
    }

    const sanitizeEvolutions = (data) => {
        if(data) {
            const evolution = onlyEvolutions(data?.evolution_chain?.evolution?.chain);
            const lastHeight = evolution.slice(-1).at(0)?.height;
            const reorderedEvolution = reorder(evolution, data.name);
            

            return {
                original: evolution.map(record => sanitizeData(record, lastHeight)),
                reordered: reorderedEvolution.map(record => sanitizeData(record, lastHeight))
            }
        }
    }

    const getEvolutions = useCallback(() => sanitizeEvolutions(data), [data]);
    
    return {
        text,
        evolution: getEvolutions()
    }
}