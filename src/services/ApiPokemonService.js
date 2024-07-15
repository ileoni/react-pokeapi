const limit = 151;

const baseUrl = `https://pokeapi.co/api/v2/pokemon`;


const fetching = async (url) => {
    const response = await fetch(url);
    return response.json();
}

const getEvolutions = (evolutions, evolutionChain = []) => {
    const { evolves_to, species } = evolutions;

    evolutionChain.push(`${baseUrl}/${species.name}`);

    if(evolves_to.length > 0) {
        const [ evolvesTo ] = evolves_to;
        getEvolutions(evolvesTo, evolutionChain)
    };

    return evolutionChain;
}

const fetchPokemons = async (urls) => {
    const fetchPokemon = async (url) => await fetching(url);
    let pokemons = await Promise.all(urls.map(fetchPokemon));

    const pokemonMap = (params = [], key = "default", callback) => {
        return params.map(async param => {
            return { 
                ...param,
                [key]: await callback(param) 
            }
        })
    }

    const fetchWeaknesses = async ({types}) => Promise.all(types.map(({type}) => fetching(type.url)));
    pokemons = await Promise.all(pokemonMap(pokemons, "weaknesses", fetchWeaknesses));

    const fetchSpecies = async ({species}) => fetching(species.url);
    pokemons = await Promise.all(pokemonMap(pokemons, "species", fetchSpecies))

    const fetchEvolutionsChain = async ({species}) => {
        const responseEvolution = await fetching(species.evolution_chain.url);
        const evolutionChainUrls = getEvolutions(responseEvolution.chain)
        return Promise.all(evolutionChainUrls.map(fetchPokemon));
    }
    pokemons = await Promise.all(pokemonMap(pokemons, "evolutions", fetchEvolutionsChain))

    return pokemons;
}

const getTypes = (types) => types.flatMap(({type}) => type.name);

const getWeakness = (weaknesses) => {
    const doubleDamageFrom = weaknesses.map(({damage_relations}) => damage_relations.double_damage_from);
    return doubleDamageFrom.flat(1).map(({name}) => name);
}

const random = (param) => Math.floor(Math.random() * param);

const getText = ({flavor_text_entries}) => {
    const findByLanguageEN = ({language}) => language.name === "en";
    const textEntries = flavor_text_entries.filter(findByLanguageEN);
    const randomIndex = random(textEntries.length);

    return textEntries[randomIndex].flavor_text;
}

const getSprite = (sprites) => {
    return sprites.other['official-artwork'].front_default;
}

const getStats = (stats) => {
    return stats.map(({base_stat, stat}) => ({ name: stat.name, value: base_stat }));
}

const simpleResponseData = (evolutions) => {
    return evolutions.map(pokemon => ({
        name:           pokemon.name,
        height:         pokemon.height,
        weight:         pokemon.weight,
        sprite:         getSprite(pokemon.sprites)    
    }))
}

const responseData = (pokemon) => ({
    id:             String(pokemon.id).padStart(4, "0"),
    name:           pokemon.name,
    height:         pokemon.height,
    weight:         pokemon.weight,
    text:           getText(pokemon.species),
    sprite:         getSprite(pokemon.sprites),
    evolutions:     simpleResponseData(pokemon.evolutions),
    stats:          getStats(pokemon.stats),
    types:          getTypes(pokemon.types),
    weaknesses:     getWeakness(pokemon.weaknesses)
})

export const fetchData = async () => {
    const endpoint = `${baseUrl}?limit=${limit}&offset=0`
    const response = await fetching(endpoint);
    const { results } = response;
    
    let urls = results.map(({url}) => url)
    urls = urls.slice(0,12);
    const pokemons = await fetchPokemons(urls);
    
    return pokemons.map(responseData);
}

export const getPokemon = async (pokemons, name) => {
    const filterPokemonByName = (pokemon) => pokemon.name === name;
    return pokemons.filter(filterPokemonByName).at(0);
}

export const getPokemonRandom = async (pokemons) => {
    const randomIndex = random(pokemons.length);
    return pokemons[randomIndex];
}