import { useQuery } from "@apollo/client";

import { GET_POKEMONS } from "../graphql/query";
import { useEffect, useState } from "react";

const initialState = {
    data: [],
    loading: true,
    _fill(attributes) {
        this.data = attributes;

        if(attributes.length > 0) {
            this.data = attributes.map(item => ({ ...initialState, data: item }));
        }

        return this;
    },
    id() {
        return this.data.id;
    },
    name() {
        return this.data.name;
    },
    sprite() {
        return this.data.sprites.other['official-artwork'].front_default;
    },
    _cachingEvolution(tree, data = []) {
        const { evolves_to, species } = tree;

        data.push(species.pokemon);
        if(evolves_to[0] != undefined) {
            this._cachingEvolution(evolves_to[0], data);
        }

        return this._fill(data);
    },
    evolution() {
        return this._cachingEvolution(this.data.species.evolution_chain.evolution.chain);
    },
    getById(id) {
        const [data] = this.data.filter(({data}) => data.id === id);
        return data;
    }
}

export const usePokeapi = () => {
    const [state, setState] = useState(initialState);

    const { data, loading } = useQuery(GET_POKEMONS);

    useEffect(() => {
        if(!loading) {
            const pokemons = data.pokeapi.pokemons.map(({pokemon}) => pokemon);
            setState(state => ({
                ...state,
                data: state._fill(pokemons),
                loading: false
            }));
        }
    }, [data, loading])

    return state;
}