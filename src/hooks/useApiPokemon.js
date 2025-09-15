import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { LIMIT, MAX_LENGTH, START } from "../constants";
import { GET_POKEMONS } from "../queries";

export const useApiPokemon = (props) => {
    const [initialState, setInitialState] = useState();
    const [state, setState] = useState([]);
    const [reachedMaximumLength, setToTrueIfReachedLength] = useState(false);

    const configs = {
        variables: { limit: LIMIT, offset: START }
    }

    const { data, loading, fetchMore } = useQuery(GET_POKEMONS, configs);

    useEffect(() => {
        if(data) {
            const records = data.pokeapi.pokemons;
            setInitialState(records);
            setState(records);
        }
    }, [data]);

    const sanitizedData = (data) => {
        return {
            id: data?.id,
            number: data?.id.toString().padStart(4, "0000"),
            name: data?.name,
            sprite: data?.sprites.other['official-artwork'].front_default,
        }
    }
    
    const filterPokemons = (value) => {
        const handleFilter = ({ pokemon }) => pokemon.name.includes(value);
        const filtered = state.filter(handleFilter);
        const sanitized = filtered.map(({pokemon}) => sanitizedData(pokemon));
        return sanitized;
    }

    const all = () => {
        return state.map(({ pokemon }) => sanitizedData(pokemon));
    }

    const findPokemon = (id) => {
        const { pokemon } = state.find(({ pokemon }) => pokemon.id === id);
        return sanitizedData(pokemon);
    }

    const updateFetch = () => {
        const currentLimit = state.length;
        const incremented = currentLimit + LIMIT;
        const incrementedIsGreathedThanMaxlength = incremented >= MAX_LENGTH
        const limit = incrementedIsGreathedThanMaxlength ? MAX_LENGTH: incremented;

        setToTrueIfReachedLength(incrementedIsGreathedThanMaxlength);

        const variables = {
            limit, offset: 0
        }

        fetchMore({
            variables,
            updateQuery(previousResult, { fetchMoreResult }) {
                return {
                    ...previousResult,
                    ...fetchMoreResult,
                }
            }
        })

        const records = data.pokeapi.pokemons;
        setState(records)
    }
    
    const getRandomPokemon = () => {
        const index = Math.floor(Math.random() * state.length);
        const pokemon = state[index]?.pokemon;
        return sanitizedData(pokemon);
    }
    
    const getSprite = (id) => {
        const pokemon = findPokemon(id);
        return pokemon.sprite;
    }
    
    const sameName = (id, name) => {
        const pokemon = findPokemon(id);
        return pokemon.name === name;
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