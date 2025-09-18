import { FULL_ANGLE } from "../constants";
import { useEvolutionChain } from "../hooks/useEvolutionChain";

function Carousel() {
    const { 
        axis,
        records,
        carouselRef,
        carouselTrackRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseMove,
        handleMouseUp,
        handleTouchEnd,
        handleTouchMove,
        handleTouchStart,
    } = useEvolutionChain();

    const rotateAxis = axis === "horizontal" ? "rotatey": "rotatex";

    return (
        <div
            ref={carouselRef}
            className="h-full"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            style={{
                overflow: axis === "vertical" ? "hidden": "visible",
                perspective: "1000px"
            }}
        >
            <div
                ref={carouselTrackRef}
                className="h-full"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s ease"
                }}
            >
                {records?.map((pokemon, index) => (
                    <div
                        key={index}
                        className="w-full h-full grid place-items-center absolute inset-0 m-auto"
                        draggable={false}
                        style={{
                            backfaceVisibility: axis === "vertical" ? "hidden": "visible",
                            transform: `${rotateAxis}(${(FULL_ANGLE / records.length) * index}deg) translatez(${axis === "vertical" ? "100": "200"}px) scale(${axis === "vertical" ? "50": "70"}%)`,
                            transformStyle: "preserve-3d",
                            userSelect: "none"
                        }}
                    >
                        <img src={pokemon?.sprite} alt={pokemon?.name} draggable={false}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel;