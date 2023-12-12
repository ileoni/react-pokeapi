import { allPokemons, dataDefault } from "./PokeapiService"

export const getPokemons = async () => {
    const records = await allPokemons(12);
    return records.map(record => dataDefault(record));
}

export const findPokemonByName = async (records, needle) => {
    return records.find(({name}) => name === needle);
}

export const getRandomPokemon = async (records) => {
    const random = Math.floor(Math.random() * records.length);
    return records[random];
}
