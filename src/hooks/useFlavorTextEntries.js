import { useCallback } from "react";
import { EN } from "../constants";

export const useFlavorTextEntries = ({ data = [] }) => {
    const getLanguageEn = (data) => {
        const texts = data?.filter(({ language }) => language.name.includes(EN))
        return texts;
    }
    
    const getText = (data) => {
        const texts = getLanguageEn(data);
        const index = Math.floor(Math.random() * texts?.length);
        const text = texts[index]?.flavor_text;
        return text;
    }

    const text = useCallback(() => getText(data), [data]);

    return {
        text: text()
    }
}