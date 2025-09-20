import { useCallback, useEffect } from "react";
import { STATUS } from "../constants";

export const useStatus = ({ data }) => {
    const expressionBar = ({ base, max }) => {
        return (base / max) * 100;
    }

    const expressionStats = ({
        base,
        iv = STATUS.MIN_IV,
        ev = STATUS.MIN_EV,
        level = STATUS.MAX_LEVEL
    })  => {
        return (base * 2 + iv + (ev / 4)) * (level / 100);
    }

    const sanitizeData = (data) => {
        let records = data?.map(({ base_stat, stat }) => ({ name: stat.name, value: base_stat }));
        
        records = records?.map(({name, value}) => {
            let increasedState = expressionStats({ base: value, iv: STATUS.MAX_IV, ev: STATUS.MAX_EV });
            let decreasedState = expressionStats({ base: value });

            if(name.includes(STATUS.HP)) {
                increasedState = increasedState + 100 + 10;
                decreasedState = decreasedState + 100 + 10;
            } else {
                increasedState = (increasedState + 5) * STATUS.NATURE.GOOD;
                decreasedState = (decreasedState + 5) * STATUS.NATURE.BAD;
            }

            const max = Math.floor(increasedState);
            const min = Math.floor(decreasedState);
            const bar = Math.floor(expressionBar({ base: value, max }));

            return {
                name, 
                base: value,
                max,
                min,
                bar
            }
        });

        return records;
    }

    const stats = useCallback(() => sanitizeData(data), [data])

    return {
        stats: stats()
    }
}