import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "./Carousel.css";
import { usePokemon } from "../../hooks/usePokemon";
import { AppContext } from "../../contexts/app-context";
import Pill from "./Pill";
import PokeballSVG from "./PokeballSVG";
import { mediaMatches } from "../../utils";

const initialState = {
    isMoving: false,
    x: 0,
    y: 0
}

function Carousel() {
    const carouselRef = useRef();

    const { name } = useParams();
    const { loading, data } = usePokemon(name);
    const { currentIndex, setCurrentIndex } = useContext(AppContext);
    
    const [state, setState] = useState(initialState);
    const [evolutions, setEvolution] = useState([]);

    const orderByName = (params) => {
        const evolutions = params.evolutions();
        const index = evolutions.findIndex(data => data.name() === name);
        
        const after = evolutions.slice(index);
        const before = evolutions.slice(0, index);
        
        return [...after, ...before];
    }

    useEffect(() => {
        if(!loading) {
            const pokemonEvolutions = orderByName(data);
            setEvolution(pokemonEvolutions);
        }
    }, [loading]);

    const logEndEvents = (e) => {
        setState({...initialState});
    }

    const handlerMouseLeave = (e) => logEndEvents(e);
    const handlerMouseUp = (e) => logEndEvents(e);
    const handlerTouchEnd = (e) => logEndEvents(e.changedTouches[0]);

    const logStartEvents = (e) => {
        setState({
            isMoving: true,
            x: e.pageX,
            y: e.pageY
        });
    }

    const handlerMouseDown = (e) => logStartEvents(e);
    const handlerTouchStart = (e) => logStartEvents(e.changedTouches[0]);

    const checkPosition = (position) => position !== "afterbegin";

    const handlerTransitionEnd = (carousel, position) => {
        carousel.style.transition = "none";
        
        if(mediaMatches()) {
            carousel.style.transform = `rotatex(0deg) rotatey(0deg) rotatez(90deg)`;
        } else {
            carousel.style.transform = `rotatex(0deg) rotatey(0deg) rotatez(0deg)`;
        }

        const [first, , last] = carousel.children;
        
        let element = checkPosition(position) ? first: last;
        carousel.insertAdjacentElement(position, element);
    }

    const animationStart = (carousel, angle, position) => {
        const adjustedAngle = checkPosition(position) ? angle * -1: angle;
        carousel.style.transition = "0.6s transform";

        if(mediaMatches()) {
            carousel.style.transform = `rotatex(${adjustedAngle * -1}deg) rotatey(0deg) rotatez(90deg)`;
        } else {
            carousel.style.transform = `rotatex(0deg) rotatey(${adjustedAngle}deg) rotatez(0deg)`;
        }
    } 

    const onPrevious = (carousel, angle, position) => {
        animationStart(carousel, angle, position);
        
        carousel.addEventListener(
            "transitionend",
            e => {
                handlerTransitionEnd(carousel, position);

                let newIndex = currentIndex <= 0 ?  carousel.children.length - 1: currentIndex - 1;
                setCurrentIndex(newIndex);
            },
            { once: true }
        );
    }

    const onNext = (carousel, angle, position) => {
        animationStart(carousel, angle, position);
        
        carousel.addEventListener(
            "transitionend",
            e => {
                handlerTransitionEnd(carousel, position);

                let newIndex = currentIndex >= carousel.children.length - 1 ?  0: currentIndex + 1;
                setCurrentIndex(newIndex);
            },
            { once: true }
        );
    }

    const determinateDirection = (e, value) => {
        const carousel = carouselRef.current;
        const angle = 360 / carousel.children.length;

        if(value > 0) {
            onPrevious(carousel, angle, "afterbegin");
        } else {
            onNext(carousel, angle, "beforeend");
        }
    }

    const logMoveEvents = (e) => {
        const { isMoving, x, y } = state;
        if(isMoving) {
            const coordenate = mediaMatches() ? e.pageY - y: e.pageX - x;
            determinateDirection(e, coordenate);
        }
    }

    const handlerMouseMove = (e) => logMoveEvents(e);
    const handlerTouchMove = (e) => logMoveEvents(e.changedTouches[0])

    const throttle = (callback, delay = 300) => {
        let lastCall = 0;

        return function () {
            const now = new Date().getTime();

            if(now - lastCall < delay) return;

            lastCall = now;
            callback.apply(this, arguments);
        }
    }

    return (
        <div className="wrapper-carousel">
            <div className="carousel__content relative">
                {!loading && (
                    <div className="md:absolute">
                        <div className="grid grid-flow-col auto-cols-min gap-2">
                            {evolutions[currentIndex]?.types().map((type, index) => <Pill key={index} type={type} />)}
                        </div>
                        <h3 className="capitalize text-white font-bold font-cairo">{evolutions[currentIndex]?.name()}</h3>
                        <div className="grid grid-flow-col auto-cols-max items-center gap-2">
                            <span className="text-white">Nº {evolutions[currentIndex]?.pokedexNumber()}</span>
                            <PokeballSVG className="fill-white" size={14}/>
                        </div>
                    </div>
                )}
            </div>
            <div 
                ref={carouselRef} 
                className="carousel"
                onMouseLeave={handlerMouseLeave}
                onMouseUp={handlerMouseUp}
                onTouchEnd={handlerTouchEnd}
                onMouseDown={handlerMouseDown}
                onTouchStart={handlerTouchStart}
                onMouseMove={throttle(handlerMouseMove)}
                onTouchMove={throttle(handlerTouchMove)}
            >
                {!loading && evolutions?.map((data, index) => (
                    <div key={index} className="carousel__card">
                        <img src={data.sprite()} alt={data.name()} height="auto" width={200} draggable="false"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel;