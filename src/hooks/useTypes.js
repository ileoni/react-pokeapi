import { useCallback, useEffect, useMemo, useState } from "react";
import { useType } from "./useType"
import { useDamageRelations } from "./useDamageRelations";
import { DEFAULT_DAMAGE } from "../constants";

export const useTypes = ({ data }) => {
    const sanitizedAllTypes = (data) => {
        const records = data?.all?.types.map(({ name }) => ({ name, value: DEFAULT_DAMAGE }));
        return records;
    }

    const sanitizedTypes = (data) => {
        const records = data?.types.map(({ type }) => ({ name: type.name }));
        return records;
    }

    const sanitizedDamageRelations = (data) => {
        const doubleDamages = data?.types.flatMap(({type}) => type.damageRelations.damage_relations.double_damage_from);
        const halfDamages = data?.types.flatMap(({type}) => type.damageRelations.damage_relations.half_damage_from);
        const noDamages = data?.types.flatMap(({type}) => type.damageRelations.damage_relations.no_damage_from);
        return { doubleDamages, halfDamages, noDamages };
    }

    const sanitezedAll = useCallback(() => sanitizedAllTypes(data), [data]);
    const sanitezedTypes = useCallback(() => sanitizedTypes(data), [data]);
    const sanitezedDamageRelations = useCallback(() => sanitizedDamageRelations(data), [data]);

    const { damageRelations } = useDamageRelations({ all: sanitezedAll(), damage: sanitezedDamageRelations() });
    
    return {
        types: sanitezedTypes(),
        damageRelations
    }
}