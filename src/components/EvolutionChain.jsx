import { createContext, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import FloatingCard from "./FloatingCard";
import Carousel from "./Carousel";

export const EvolutionChainContext = createContext({});

function EvolutionChain({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const axis = !isMobile ? "horizontal": "vertical";

    return (
        <EvolutionChainContext.Provider
            value={{ axis, data, currentIndex, setCurrentIndex }}
        >
            <div className="relative grid place-items-center">
                <div className="min-w-full w-full h-96 sm:min-w-min sm:size-96">
                    <FloatingCard/>
                    <Carousel/>
                </div>
            </div>
        </EvolutionChainContext.Provider>
    )
}

export default EvolutionChain;