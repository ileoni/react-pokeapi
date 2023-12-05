const baseUrl = "https://pokeapi.co/api/v2";

const get = async (endpoint) => {
    const response = await fetch(endpoint);
    return response.json();
}

const api = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`);
        return response.json();   
    } catch (error) {
        throw new Error("Algo deu errado ao acessar api.");
    }
}

export const getByName = async (endpoint) => {
    if(endpoint.includes('pokemon')) {
        endpoint = String(endpoint).replace('/pokemon/', '');
    }
    const data = await api(`pokemon/${endpoint}`);
    return dataDefault(data);
}

export const getAll = async (limit) => {
    const {results} = await api(`pokemon?limit=${limit}`);
    const fetchPokemons = async ({name}) => await api(`pokemon/${name}`);
    const pokemons = results.map(fetchPokemons);

    return Promise.all(pokemons)
        .then(pokemons => pokemons.map(pokemon => dataDefault(pokemon)))
}

export const randomPokemon = (records) => {
    if(records !== []) {
        const pokemonNumber = Math.floor(Math.random() * records.length);
        return records[pokemonNumber];
    }
    
    return false;
}

const replaceId = (id) => {
    return String(id).padStart(4, '0');
}

const dataDefault = ({id, name, sprites}) => {
    return {
        id: replaceId(id),
        name: name,
        sprite: sprites.other['official-artwork']['front_default']
    };
}


const promiseHandler = (records) => {
    let evolution = [];
    let index = 0;
    const recursive = (record) => {
        const hasEvolution = !!record?.evolves_to;
        if(hasEvolution) {
            evolution.push(record.species.name);
            const [current] = record.evolves_to;
            return recursive(current);
        } else {
            return evolution;
        }
    }

    return recursive(records);
}

const evolutionChainById = async (species) => {
    const {evolution_chain} = await get(species.url);
    const {chain} = await get(evolution_chain.url);
    const evolutions = promiseHandler(chain);
    const fetching = async evolution => api(`pokemon/${evolution}`);
    const response = evolutions.map(fetching);
    return Promise.all(response);
}

const typeByName = async (types) => {
    const fetching = async ({type}) => await api(`type/${type.name}`);
    const response = types.map(fetching);
    return Promise.all(response);
}

const speciesById = async (id) => {
    const response = await api(`pokemon-species/${id}`);
    return response;
}

const pokemonByName = async (endpoint) => {
    const ajusted = String(endpoint).replace('/', '');
    const response = await api(ajusted);
    return response;
}

const defaultImage = (sprites) => sprites?.other['official-artwork'].front_default;

const dataEvolution = ({name, sprites, height, weight}) => {
    return  {
        name, sprite: defaultImage(sprites), height, weight
    }
}

const dataDamages = ({damage_relations}) => {
    const {double_damage_from} = damage_relations;
    const types = double_damage_from.map(({name}) => name);
    return {
        double: types
    }
}

const selectingLanguage = ({language}) => language.name.includes('en');

const dataTextEntries = ({flavor_text_entries}) => {
    const textEntries = flavor_text_entries.filter(selectingLanguage);
    const index = Math.floor(Math.random() * textEntries.length);
    const ajusted = String(textEntries[index].flavor_text).replace('\f', '');
    return {
        text: ajusted
    }
}


const dataStats = ({base_stat, stat}) => {
    return {
        subject: stat.name,
        value: base_stat,
    }
}

const dataPokemon = ({id, name, sprites, stats, types, height, weight}) => {
    return {
        id: replaceId(id), 
        name, 
        height, 
        weight, 
        sprite: defaultImage(sprites),
        stats: stats.map(dataStats),
        types: types.map(({type}) => type.name)
    }
}

const dataDetails = (records) => {
    const {pokemon, type, species, evolutionChain} = records;
    return {
        ...dataPokemon(pokemon),
        ...dataTextEntries(species),
        damages: type.map(dataDamages),
        evolutions: evolutionChain.map(dataEvolution)
    };
}
 
export const detailsPage = async (endpoint) => {
    const pokemon = await pokemonByName(endpoint);
    const species = await speciesById(pokemon.id);
    const type = await typeByName(pokemon.types);
    const evolutionChain = await evolutionChainById(pokemon.species);
    return dataDetails({pokemon, species, type, evolutionChain});
}