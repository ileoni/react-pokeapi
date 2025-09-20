import { useCallback } from "react"
import { DEFAULT_DAMAGE } from "../constants";
import { useDamageRelations } from "./useDamageRelations";

export const useType = ({ data }) => {
    const sanitizeAllTypes = (data) => {
        const records = data?.all?.types.map(type => ({ name: type.name, value: DEFAULT_DAMAGE }));
        return records;
    }

    const sanitizeTypes = (data) => {        
        const records = data?.types?.map(({type}) => ({ name: type.name }));
        return records;
    }

    const sanitizeDamageRelations = (data) => {        
        const doubleDamage = data?.types?.flatMap(({type}) => type.damageRelations.damage_relations.double_damage_from);
        const halfDamage = data?.types?.flatMap(({type}) => type.damageRelations.damage_relations.half_damage_from);
        const noDamage = data?.types?.flatMap(({type}) => type.damageRelations.damage_relations.no_damage_from);
        return { doubleDamage, halfDamage, noDamage }
    }

    
    const getAllTypes = useCallback(() => sanitizeAllTypes(data), [data]);
    const getTypes = useCallback(() => sanitizeTypes(data), [data]);
    const getDamageRelations = useCallback(() => sanitizeDamageRelations(data), [data]);

    const { damageRelations } = useDamageRelations({ all: getAllTypes(), damage: getDamageRelations() });
    
    return {
        types: getTypes(),
        damageRelations
    }
}