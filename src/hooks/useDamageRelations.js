import { useCallback, useEffect, useMemo } from "react";
import { DOUBLE_DAMAGE, HALF_DAMAGE, NO_DAMAGE } from "../constants";

export const useDamageRelations = ({ all, damage }) => {
    const sanitizedPartDamages = (all, types, damage) => {
        types?.forEach(({ name }) => {
            all.filter((type) => {
                if(type.name.includes(name)) {
                    type.value *= damage;
                }
    
                return type;
            })
        })
    }

    const sanitizedDamageRelations = (all, damage) => {
        sanitizedPartDamages(all, damage?.doubleDamage, DOUBLE_DAMAGE);
        sanitizedPartDamages(all, damage?.halfDamage, HALF_DAMAGE);
        sanitizedPartDamages(all, damage?.noDamage, NO_DAMAGE);
        return all;
    }

    const damageRelations = useCallback(() => sanitizedDamageRelations(all, damage), [damage]);

    return {
        damageRelations: damageRelations()
    }
}