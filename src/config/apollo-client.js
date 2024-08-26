import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const baseUrl = "https://pokeapi.co/api/v2/";

const typePatcher = {
    Species: (data) => {
        if(data != null) {
            const [id] = String(data.evolution_chain.url).split("/").slice(-2, -1);
            data.evolution_chain.id = id;
        }
        return data;
    }
}

const restLink = new RestLink({
    uri: baseUrl,
    typePatcher
});

export const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache()
});