import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMON } from "../queries";

const initialState = {
    data: [],
    loading: true,
    all() {
        return this.data;
    },
    id() {
        return this.data.id;
    },
    catchingEvolution(evolution, data = []) {
        const { evolves_to, species } = evolution;
        
        data.push(species.pokemon);
        if(evolves_to[0] != undefined) this.catchingEvolution(evolves_to[0], data);

        return this._fill(data);
    },
    evolutions() {
        const { evolution } = this.data.species.evolution_chain;
        return this.catchingEvolution(evolution.chain).data;
    },
    height() {
        const { height } = this.data;
        let data = "";
        let symbol = 'cm';

        if(height < 10) {
            data = String(height).padEnd(2, '00');
        } else {
            data = height / 10;
            symbol = 'M';
        }
        
        return String(data).concat(symbol);
    },
    name() {
        return this.data.name;
    },
    pokedexNumber() {
        return String(this.data.id).padStart(4,'0');
    },
    sprite() {
        return this.data.sprites.other['official-artwork'].front_default;
    },
    stats() {
        return this.data.stats.map(({base_stat, stat}) => ({
            name: stat.name,
            base: base_stat,
            min: this.calculateMinimum(stat.name, base_stat), 
            max: this.calculateMaximum(stat.name, base_stat) 
        }));
    },
    weight() {
        const weight = this.data.weight / 10;
        return String(weight).concat('Kg');
    },
    calculatePartialStats(base, iv = 0, ev = 0, level = 100) {
        return (base * 2 + iv + (ev / 4)) * (level / 100);
    },
    calculateMinimum(name, base) {
        let partial = this.calculatePartialStats(base);

        if(name == "hp") {
            partial = partial + 100 + 10;
        } else {
            partial = (partial + 5) * 0.9;
        }

        return Math.floor(partial);
    },
    calculateMaximum(name, base) {
        let partial = this.calculatePartialStats(base, 31, 252);
        if(name == "hp") {
            partial = partial + 100 + 10;
        } else {
            partial = (partial + 5) * 1.1;
        }

        return Math.floor(partial);
    },
    text() {
        const texts = this._catchingLanguage(this.data.species.flavor_text_entries, "en");
        const index = Math.floor(Math.random() * texts.length);
        return texts[index].flavor_text;
    },
    doubleDamageFrom() {
        return this.data.types.flatMap(({type}) => type.damageRelations.damage_relations.double_damage_from);
    },
    halfDamageFrom() {
        return this.data.types.flatMap(({type}) => type.damageRelations.damage_relations.half_damage_from);
    },
    noDamageFrom() {
        return this.data.types.flatMap(({type}) => type.damageRelations.damage_relations.no_damage_from);
    },
    allTypes() {
        const defaultDamage = 1;
        const noDamage = 0;
        const halfDamage = 0.5;
        const doubleDamage = 2;
        const { types } = this.data.allTypes;
        const allDoubleDamage = this.doubleDamageFrom();

        const newData = [];

        for (const type of types) {
            newData.push({...type, value: defaultDamage})
        }

        for (const {name} of allDoubleDamage) {
            if(types.filter(type => type.name === name)) {
                newData.filter(type => { if(type.name === name) type.value *= doubleDamage });
            }
        }
        
        const allHalfDamage = this.halfDamageFrom();

        for (const {name} of allHalfDamage) {
            if(types.filter(type => type.name === name)) {
                newData.filter(type => { if(type.name === name) type.value *= halfDamage });
            }
        }

        const allNoDamage = this.noDamageFrom();

        for (const {name} of allNoDamage) {
            if(types.filter(type => type.name === name)) {
                newData.filter(type => { if(type.name === name) type.value = noDamage; });
            }
        }
        
        return newData;
    },
    types() {
        return this.data.types.map(({type}) => type.name);
    },
    _fill(attributes) {
        if(!!attributes.length) {
            return { ...initialState, data: attributes.map(data => this._fill(data)) };
        }
        return { ...initialState, data: attributes }
    },
    _catchingLanguage(params, acronym) {
        return params.filter(({language}) => language.name === acronym);
    }
}

export const usePokemon = (name) => {
    const { data, loading } = useQuery(GET_POKEMON, { variables: { name } });
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(!loading) {
            setState(state => ({
                ...state,
                data: state._fill(data.pokeapi),
                loading: false
            }));
        }
    }, [loading])

    return state;
}