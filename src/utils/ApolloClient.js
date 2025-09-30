import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

import { BASE_URL } from "../constants";

const restlink = new RestLink({
    uri: BASE_URL,
    typePatcher: {
        Record: (data) => {
            const { types } = data;
            return { ...data, type: { types }}
        },
        Species: (data) => {
            const [ endpoint ] = data.evolution_chain.url.split("/v2/").slice(-1);
            return { ...data, evolution_chain: { endpoint } };
        }
    }
});

export const client = new ApolloClient({
    link: restlink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    recordList: {
                        keyArgs: false,
                        merge(existing = {}, incoming = {}) {
                            return {
                                ...incoming,
                                records: [
                                    ...(existing.records || []),
                                    ...(incoming.records || [])
                                ]
                            }
                        }
                    }
                }
            },
            Records: { keyFields: ["name"] },
            Record: { keyFields: ["name"] },
            Species: { keyFields: ["name"] },
            EvolutionChain: { keyFields: ["id"] },
            All: { keyFields: false }
        }
    })
});