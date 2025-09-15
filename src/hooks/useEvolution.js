import { useEffect, useState } from "react";

export const useEvolution = (data) => {
    const [evolution, setEvolutionChain] = useState([]);
    const [last, setLastPokemon] = useState([]);
    
    const onlyEvolutions = (record , evolution = []) => {
        const { evolves_to: [ evoltesTo ], species } = record;

        evolution.push(species.pokemon);
        if(evoltesTo != undefined) onlyEvolutions(evoltesTo, evolution);
        
        return evolution;
    }

    useEffect(() => {
        if(data) {
            const evolutionChain = onlyEvolutions(data);
            const [ lastPokemon ] = evolutionChain.slice(-1);
            setLastPokemon(lastPokemon);
            setEvolutionChain(evolutionChain);
        }
    }, [data]);

    const sanitizedData = (data) => {
        const weight = data.weight / 10;
        const height = data.height / 10;
        const percentageOfEachHeight = Math.floor((data.height / last.height) * 100)
        const adjustedTypes = data.types.flatMap(({type}) => ({ name: type.name }));

        return {
            id: data.id,
            number: data.id.toString().padStart(4, "0000"),
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default,
            weight: `${weight} KG`,
            height: {
                value: (height < 1) ? `${data.height} cm`: `${height} M`,
                percentageOfEachHeight
            },
            types: adjustedTypes
        }
    }

    const all = () => {
        return evolution.map(pokemon => sanitizedData(pokemon));
    }

    const evolutionsOrderedByPriorities = ({ name }) => {
        const evolution = all();
        const selfIndex = evolution.findIndex(pokemon => pokemon.name === name);
        const left = evolution.slice(selfIndex);
        const right = evolution.slice(0, selfIndex);

        return [...left, ...right]
    }

    return {
        all,
        evolutionsOrderedByPriorities
    }
}