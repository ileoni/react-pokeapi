const baseUrl = "https://pokeapi.co/api/v2";

export const get = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        return response.json();
    } catch (error) {   
        throw new Error("Algo deu errado!");
    }
}

export const endpointReplace = (endpoint, replace = 'pokemon') => {
    return String(endpoint).replace('/pokemon',replace);
}

export const getPokemon = async (endpoint) => {
    const response = await get(`${baseUrl}/${endpoint}`);
    return response;
}

export const allPokemons = async (limit) => {
    const {results} = await get(`${baseUrl}/pokemon?limit=${limit}`);
    const response = results.map(({url}) => get(url));
    return Promise.all(response);
}

const pokemonImage = ({other}) => {
    return other['official-artwork'].front_default;
}

const pokemonNumber = (param) => {
    return String(param).padStart( 4, '0');
}

export const dataDefault = ({id, name, sprites}) => {
    return {
        id: pokemonNumber(id), 
        name, 
        image: pokemonImage(sprites)
    };
}