import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const baseUrl = "https://pokeapi.co/api/v2/";

const restlink = new RestLink({
    uri: baseUrl,
    typePatcher: {
        Species: (data) => {
            if(data != null) {
                const [id] = String(data.evolution_chain.url).split("/").slice(-2, -1);
                data.evolution_chain.id = id;
            }
            return data;
        }
    },
});

export const client = new ApolloClient({
    link: restlink,
    cache: new InMemoryCache()
});