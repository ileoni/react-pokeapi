import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMONS } from "../queries";

export const LIMIT = 12;
export const MAX_LENGTH = 151;

const initialState = {
    data: [],
    loading: true,
    all() {
        return this.data;
    },
    id() {
        return this.data.id;
    },
    name() {
        return this.data.name;
    },
    pokedexNumber() {
        return String(this.data.id).padStart(4, '0');
    },
    sprite() {
        return this.data.sprites.other['official-artwork'].front_default;
    },
    _fill(attributes) {
        if(!!attributes.length) {
            return { ...initialState, data: attributes.map(data => this._fill(data)) };
        }
        return { ...initialState, data: attributes }
    },
    getById(id) {
        const [data] = this.data.filter(({data}) => data.id === id);
        return data;
    },
    getRandomPokemon(currendId = null) {
        const maxLength = this.data.length;
        const index = Math.floor(Math.random() * maxLength);
        
        if(currendId !== null && currendId === this.data[index].id()) {
            return this.getRandomPokemon(currendId);
        }
        
        return this.data[index];
    },
    sameAsName(name) {
        return this.name() === name;
    }
}

export const usePokemons = () => {
    const { data, loading, fetchMore } = useQuery(GET_POKEMONS, { variables: { limit: LIMIT, offset: 0 } });
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(!loading) {
            const records = data.pokeapi.pokemons.map(({pokemon}) => pokemon);

            setState(state => ({
                ...state,
                data: state._fill(records),
                loading: false
            }));
        }
    }, [loading, data])

    return {
        ...state,
        fetchMore
    };
}