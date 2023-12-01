const baseUrl = "https://pokeapi.co/api/v2";

const api = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`);
        return response.json();   
    } catch (error) {
        throw new Error("Algo deu errado ao acessar api.");
    }
}

export const getByName = async (name) => {
    const data = await api(`pokemon/${name}`);
    return replaceData(data);
}

export const getAll = async (limit) => {
    const {results} = await api(`pokemon?limit=${limit}`);
    const fetchPokemons = async ({name}) => await api(`pokemon/${name}`);
    const pokemons = results.map(fetchPokemons);

    return Promise.all(pokemons)
        .then(pokemons => pokemons.map(pokemon => replaceData(pokemon)))
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

const replaceData = ({id, name, sprites}) => {
    return {
        id: replaceId(id),
        name: name,
        sprite: sprites.other['official-artwork']['front_default']
    };
}