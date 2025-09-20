import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
    query GetPokemon($name: String!) {
        pokeapi(name: $name) @rest(
            type: "Pokemon",
            path: "pokemon/{args.name}"
        ) {
            ...partialData
            species @rest(
                type: "Species",
                path: "pokemon-species/{exportVariables.name}"
            ) {
                color {
                    name
                }
                evolution_chain {
                    evolution: id @export(as: "id") @rest(
                        type: "EvolutionChain",
                        path: "evolution-chain/{exportVariables.id}"
                    ) {
                        chain @type(name: "Species") {
                            evolves_to @type(name: "Species") {
                                evolves_to @type(name: "Species") {
                                    evolves_to
                                    ...speciesData
                                }
                                ...speciesData
                            }
                            ...speciesData
                        }
                    }
                }
                flavor_text_entries {
                    flavor_text language
                }
            }
            stats,
            type {
                types {
                    type {
                        name @export(as: "name")
                        damageRelations @rest(
                            type: "Type",
                            path: "type/{exportVariables.name}"
                        ) {
                            damage_relations {
                                double_damage_from { name }
                                double_damage_to { name }
                                half_damage_from { name }
                                half_damage_to { name }
                                no_damage_from { name }
                                no_damage_to { name }
                            }
                        }
                    }
                }
                all @rest(
                    type: "All"
                    path: "type"
                ) {
                    types: results { name }
                }
            }
            weight
        }
    }

    fragment partialData on Pokemon {
        height id name @export(as: "name") sprites weight
    }

    fragment speciesData on Species {
        species {
            pokemon: name @export(as: name) @rest(
                type: "Pokemon",
                path: "pokemon/{exportVariables.name}"
            ) {
                ...partialData types
            }
        }
    }
`;

export const GET_POKEMONS = gql`
    query GetPokemons($limit: Int!, $offset: Int!) {
        pokeapi(limit: $limit, offset: $offset) @rest(
            path: "pokemon?limit={args.limit}&offset={args.offset}",
            type: "Pokeapi"
        ) {
            pokemons: results {
                pokemon: name @export(as: "name") @rest(
                    path: "pokemon/{exportVariables.name}"
                    type: "Pokemon"
                ) {
                    id
                    name
                    sprites
                }
            }
        }
    }
`;