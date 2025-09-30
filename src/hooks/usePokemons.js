import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { LIMIT, MAX_LENGTH, START } from "../constants";
import { GET_POKEMONS } from "../configs/queries";

export const usePokemons = () => {
    const [state, setState] = useState([]);
    const [reachedMaximumLength, setToTrueIfReachedLength] = useState(false);

    const options = {
        variables: {
            limit: MAX_LENGTH, offset: START
        }
    }

    const { data, fetchMore, loading } = useQuery(GET_POKEMONS, options);

    useEffect(() => {
        if(!loading) {
            const records = data.recordList.records;
            setState(records);
        }
    }, [loading]);
    
    const sanitizedData = (data) => {
        return {
            id: data?.id,
            number: data?.id.toString().padStart(4, "0000"),
            name: data?.name,
            sprite: data?.sprites.other['official-artwork'].front_default,
        }
    }

    const filterPokemons = (value) => {
        const handleFilter = ({ record }) => record.name.includes(value);
        const filtered = state.filter(handleFilter);
        const sanitized = filtered.map(({record}) => sanitizedData(record));
        return sanitized;
    }

    const all = () => {
        return state.map(({ record }) => sanitizedData(record));
    }

    const findPokemon = (id) => {
        const { record } = state.find(({ record }) => record.id === id);
        return sanitizedData(record);
    }

    const updateFetch = () => {
        const currentLimit = state.length;
        const incremented = currentLimit + LIMIT;
        const incrementedIsGreathedThanMaxlength = incremented >= MAX_LENGTH;
        const limit = incrementedIsGreathedThanMaxlength ? MAX_LENGTH: incremented;

        setToTrueIfReachedLength(incrementedIsGreathedThanMaxlength);

        const variables = {
            limit, offset: 0
        }

        fetchMore({ variables });
        
        const records = data.recordList.records;
        setState(records)
    }
    
    const getRandomPokemon = () => {
        const index = Math.floor(Math.random() * state.length);
        const record = state[index]?.record;
        return sanitizedData(record);
    }
    
    const getSprite = (id) => {
        const record = findPokemon(id);
        return record.sprite;
    }
    
    const sameName = (id, name) => {
        const record = findPokemon(id);
        return record.name === name;
    }

    return {
        loading,
        state,
        all,
        filterPokemons,
        findPokemon,
        getRandomPokemon,
        getSprite,
        reachedMaximumLength,
        sameName,
        updateFetch
    };
}