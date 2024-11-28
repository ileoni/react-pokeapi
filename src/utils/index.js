export const mediaMatches = () => {
    const media = window.matchMedia("(max-width: 600px)");
    return media.matches;
}