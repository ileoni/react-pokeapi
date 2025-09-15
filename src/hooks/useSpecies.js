import { useEvolution } from "./useEvolution";

export const useSpecies = ({ data }) => {
    const { all, evolutionsOrderedByPriorities } = useEvolution(data?.evolution_chain.evolution.chain);
    return {
        all,
        evolutionsOrderedByPriorities
    }
}