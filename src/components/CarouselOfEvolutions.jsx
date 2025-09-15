import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "../hooks/useMediaQuery";
import { useCarousel } from "../hooks/useCarousel";
import { Pill } from "./Pill";
import Pokeball from "./Pokeball";
import { RotateCcw, RotateCw } from "lucide-react";

const CarouselItem = (props) => {
    const { data, index, max } = props;
    
    const isMobile = useMediaQuery("(max-width: 640px)");

    const translateAxis = isMobile ? "rotatex": "rotatey";

    let style = {
        backfaceVisibility: isMobile ? "hidden": "visible",
        transform: `${translateAxis}(${(360 / max) * index}deg) translatez(200px)`,
        transformStyle: "preserve-3d",
    }

    return (
        <div 
            className="size-full absolute grid justify-items-center items-center sm:items-start"
            style={style}
        >
            <span className="after:content-[''] absolute top-12 sm:-top-1/4 sm:-left-3/4 grid sm:gap-4 text-white" style={{ backfaceVisibility: "hidden" }}>
                <span className="capitalize font-bold sm:text-2xl">{data?.name}</span>
                <span className="hidden sm:row-start-1 sm:grid grid-cols-2 gap-4 items-center">
                    <span className="">Nº {data?.number}</span>
                    <Pokeball className="size-4 fill-white"/>
                </span>
                <span className="hidden sm:grid sm:grid-cols-2 sm:gap-4">
                    {data?.types?.map((type, index) => <Pill key={index} type={type.name}/>)}
                </span>
            </span>
            <img src={data?.sprite} alt={data?.name} className="h-2/4 object-cover" draggable="false"/>
            <span className="before:content-[''] grid grid-flow-col gap-4 sm:hidden absolute bottom-12 left-0">
                {data?.types?.map((type, index) => <Pill key={index} type={type.name}/>)}
            </span>
        </div>
    );
}

const Carousel = ({ data }) => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const {
        carouselRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseMove,
        handleMouseUp,
    } = useCarousel(isMobile, data?.length);
    
    const carouselStyle = {
        perspective: "1000px"
    };
    
    const carouselTrackStyle = {
        height: isMobile ? "100%": "50%",
        position: "relative",
        transformStyle: "preserve-3d",
        userSelect: "none",
        width: isMobile ? "50%": "100%",
        transition: "transform 0.8s ease",
    };

    return (
        <div className="size-full grid place-items-center" style={carouselStyle}>
            <div
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={carouselRef}
                style={carouselTrackStyle}
            >
                {data?.map((pokemon, index) => <CarouselItem key={index} data={pokemon} index={index} max={data.length} />)}
            </div>
            <span className="before:content-[''] grid sm:grid-flow-col gap-4 absolute sm:bottom-0 left-6 sm:left-auto">
                <RotateCcw className="text-white"/>
                <RotateCw className="text-white"/>
            </span>
        </div>
    );
}

function CarouselOfEvolutions({ evolution, self }) {
    return (
        <>
        <div className="grid justify-center">
            <div className="min-w-full w-screen h-96 sm:size-96 overflow-hidden sm:overflow-visible">
                <Carousel data={evolution}/>
            </div>
        </div>
        </>
    );
}

export default CarouselOfEvolutions;