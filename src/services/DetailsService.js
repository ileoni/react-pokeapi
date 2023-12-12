import { getPokemon, endpointReplace, get, dataDefault } from './PokeapiService';

const isEmpty = (record) => !Object.values(record).length;

const dataEvolutions = (params) => {
    const {height, weight} = params;
    return {
        ...dataDefault(params),
        height,
        weight
    };
}

const dataDetails = (params) => {
    const {stats} = params;
    return {
        ...dataDefault(params),
        stats: stats.flatMap(({base_stat, stat}) => ({name: stat.name, value: base_stat}))
    };
}

const getTypes = async (params) => {

    return Promise.all(params)
        .then(records => ({
            type: records.flatMap(({type}) => type.name), records: records,
        }))
        .then(({type, records}) => ({
            type, typesUrl: records.flatMap(({type}) => type.url)
        }))
        .then(async ({type, typesUrl}) => ({
            type, weakeness: await Promise.all(typesUrl.map(endpoint => get(endpoint)))
        }))
        .then(async ({type, weakeness}) => ({
            type, weakeness: weakeness.flatMap(({damage_relations}) => damage_relations.double_damage_from)
        }))
        .then(async ({type, weakeness}) => ({
            type, weakeness: weakeness.flatMap(({name}) => name)
        }));
}

const getEvolutions = (params) => {
    let evolutions = [];
    const recursive = (record = []) => {
        if(isEmpty(record)) {
            return evolutions;
        } else {
            evolutions.push(record.species.name)
            return recursive(...record.evolves_to);
        }
    }

    return recursive(params);
}

const getEvolutionsChain = async (endpoint) => {
    const {chain} = await get(endpoint);
    const evolutions = getEvolutions(chain);
    
    return Promise.all(evolutions)
        .then(async endpoints => {
            const fetchingPokemons = endpoint => getPokemon(`pokemon/${endpoint}`);
            return await Promise.all(endpoints.map(fetchingPokemons))
        })
        .then(pokemons => pokemons.map(dataEvolutions))
}

const selectingLanguage = ({language}) => language.name.includes('en');

const textEntries = (params) => {
    const textEntries = params.flavor_text_entries.filter(selectingLanguage);
    const random = Math.floor(Math.random() * textEntries.length);
    return textEntries[random].flavor_text;
}

export const getPokemonDetails = async (endpoint) => {
    endpoint = endpointReplace(endpoint);
    const pokemon = await getPokemon(endpoint);
    const types = await getTypes(pokemon.types); 
    const species = await get(pokemon.species.url);
    const evolutions = await getEvolutionsChain(species.evolution_chain.url); 
    
    return {
        ...dataDetails(pokemon),
        text: textEntries(species),
        types,
        evolutions
    }
}