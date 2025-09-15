import { useEffect, useState } from "react";

export const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        setMatches(mediaMatch.matches);

        const handler = e => setMatches(e.matches);

        mediaMatch.addEventListener("change", handler);
        return () => {
            mediaMatch.removeEventListener("change", handler);
        }
    }, [])

    return matches;
}