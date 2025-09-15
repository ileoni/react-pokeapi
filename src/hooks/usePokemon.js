import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMON } from "../queries";
import { DEFAULT_DAMAGE, DOUBLE_DAMAGE, EN, HALF_DAMAGE, NO_DAMAGE, STATUS_HP } from "../constants";
import { useSpecies } from "./useSpecies";

export const usePokemon = (name) => {
    const [state, setState] = useState([]);

    const configs = {
        variables: { name }
    }
    
    const { data, loading } = useQuery(GET_POKEMON, configs);
    
    useEffect(() => {
        if(data) {
            const records = data.pokeapi;
            setState(records);
        }
    }, [data]);
    
    const onlyTextEn = (texts = []) => {
        return texts.filter(({ language }) => language.name === EN);
    }

    const randomDescription = (texts = []) => {
        const index = Math.floor(Math.random() * texts.length);
        return texts[index]?.flavor_text;
    }

    const sanitizedStats = (data) => {
        const { base_stat: base, stat: { name }, increasedState, decreasedState } = data;

        return { 
            name, 
            base,
            min: Math.floor(increasedState),
            max: Math.floor(decreasedState) 
        }
    }

    const expressionOfStats = ({ base, iv = 0, ev = 0, level = 100 }) => {
        return (base * 2 + iv + (ev / 4)) * (level / 100);
    }

    const calculateStats = (params) => {
        const { base_stat: base, stat: { name } } = params;
        let increasedState = expressionOfStats({ base });
        let decreasedState = expressionOfStats({ base, iv: 31, ev: 252});

        if(name.includes(STATUS_HP)) {
            increasedState = increasedState + 100 + 10;
            decreasedState = decreasedState + 100 + 10;
        } else {
            increasedState = (increasedState + 5) * 0.9;
            decreasedState = (decreasedState + 5) * 1.1;
        }

        return sanitizedStats({ ...params, increasedState, decreasedState });
    }

    const add = (array, value) => {
        return array.push(value);
    }

    const hasNoDuplicates = (array, { name }) => {
        return array.every(record => record.name !== name);
    }

    const updateTypeValue = (array, { name }, value) => {
        array.filter(record => {
            if(record.name === name) record.value *= value;
        })
    }

    const sanitizedPartialsDamage = (types, damage) => {
        let data = [];

        for (const type of types) {
            if(hasNoDuplicates(data, type)) {
                add(data, { ...type, value: 1 * damage});
            } else {
                updateTypeValue(data, type, damage);
            }
        }

        return data;
    }

    const sanitizedAllDamage = (types) => {
        let data = [];
        for (const type of types) {
            if(hasNoDuplicates(data, type)) {
                add(data, type);
            } else {
                updateTypeValue(data, type, type.value);
            }
        }
        return data;
    }

    const sanitizedDamageRelations = (data, all) => {
        
        let doubleDamage = data?.flatMap(({damage_relations}) => damage_relations.double_damage_from);
        let halfDamage = data?.flatMap(({damage_relations}) => damage_relations.half_damage_from);
        let noDamage = data?.flatMap(({damage_relations}) => damage_relations.no_damage_from);

        if(!doubleDamage && !halfDamage && !noDamage) return;

        // atualizando chaves e adicionando o campo value
        doubleDamage = sanitizedPartialsDamage(doubleDamage, DOUBLE_DAMAGE);
        halfDamage = sanitizedPartialsDamage(halfDamage, HALF_DAMAGE);
        noDamage = sanitizedPartialsDamage(noDamage, NO_DAMAGE);
        
        const defaultDamage = sanitizedPartialsDamage(all, DEFAULT_DAMAGE);
                
        let damages = [
            ...defaultDamage,
            ...doubleDamage,
            ...halfDamage,
            ...noDamage,
        ]

        // atualizando chaves
        damages = sanitizedAllDamage(damages);
        
        return damages;
    }

    const sanitizedTypes = (data = [], all) => {
        const { types, damageRelations } = data?.reduce((cumulative, { type }) => {
            const [ name, damageRelations ] = Object.keys(type);
            const notEmpty = Object.keys(cumulative).length;

            if(!notEmpty) {
                // se está vazio adiciona novas chaves
                cumulative['types'] = [];
                cumulative[damageRelations] = [];
            }
            
            // preenche as chaves vazias
            cumulative['types'].push({ name: type[name] });
            cumulative[damageRelations].push(type[damageRelations]);

            return cumulative;
        }, {});

        return {
            types,
            damageRelations: sanitizedDamageRelations(damageRelations, all)
        }
    }

    const evolution = useSpecies({ data: data?.pokeapi.species });

    const sanitizedData = (data) => {
        const texts = onlyTextEn(data.species?.flavor_text_entries);
        
        const stats = data.stats?.map(stat => calculateStats(stat));

        const { types, damageRelations } = sanitizedTypes(data.types, data.allTypes?.types);

        return {
            damageRelations,
            evolution: evolution.all(),
            evolutionsOrderedByPriorities: evolution.evolutionsOrderedByPriorities(data),
            id: data.id,
            name: data.name,
            number: `${data.id}`.padStart(4, "0000"),
            sprite: data.sprites?.other['official-artwork'].front_default,
            stats,
            text: randomDescription(texts),
            types,
        }
    }

    const getPokemon = () => {
        return sanitizedData(state);
    }

    return {
        getPokemon,
        state,
    }
}