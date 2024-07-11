import "./Carousel3D.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import GlowUp from "./GlowUp";

function Carousel3D({ name, evolutions })
{
    const [pokemons, setPokemons] = useState(evolutions);

    const angle = 360 / evolutions.length;
   
    const navigate = useNavigate();

    const isActivate = (pokemon) => name === pokemon.name ? "activate": "";

    const reorderEvolutions = (param) => {
        const evolutionIndex = evolutions.findIndex(pokemon => pokemon.name === param);
        const firstEvolution = evolutions.slice(evolutionIndex);
        const remainingEvolutions = evolutions.slice(0, evolutionIndex);
        return [...firstEvolution, ...remainingEvolutions];
    }

    useEffect(() => {
        const pokemons = reorderEvolutions(name);
        setPokemons(pokemons);
    }, [])

    const carouselRef = useRef(null);

    const removeClass = (carousel) => {
        [...carousel.children].forEach(child => child.classList.remove(
            "carousel__card--to", "carousel__card--prev", "carousel__card--next", "activate"
        ));
    }

    const addingClass = (carousel) => {
        const [first, next, prev] = [...carousel.children];
        
        first.classList.add("carousel__card--to");
        prev.classList.add("carousel__card--prev");
        next.classList.add("carousel__card--next");
    }

    const addingActivateClass = (carousel) => {
        const [first] = [...carousel.children];
        first.classList.add("activate");
    }

    const updatingClass = () => {
        const carousel = carouselRef.current;
        removeClass(carousel);
        addingActivateClass(carousel);
        addingClass(carousel);
    }

    const insertElements = (parent, position) => {
        let element;
        switch (position) {
            case "afterbegin":
                element = [...parent.children].at(-1);
                break;
            case "beforeend":
                element = [...parent.children].at(0);
                break;
        }
        parent.insertAdjacentElement(position, element);
    }

    const handleTransitionEnd = function (parent, position) {
        parent.style.transition = "none";
        parent.style.transform = "rotatey(0)";

        insertElements(parent, position);
        updatingClass();
    }

    const next = (parent) => {
        parent.style.transition = "0.6s transform";
        parent.style.transform = `rotatey(${angle}deg)`;
        
        parent.addEventListener('transitionend', () => handleTransitionEnd(parent, "afterbegin"), { once: true });
    }

    const prev = (parent) => {
        parent.style.transition = "0.6s transform";
        parent.style.transform = `rotatey(-${angle}deg)`;

        parent.addEventListener('transitionend', () => handleTransitionEnd(parent, "beforeend"), { once: true });
    }

    const handleClick = function ({ target }) {
        const carousel = this;

        if(target.classList.contains("carousel__card--prev")) {
            prev(carousel);
        } else if(target.classList.contains("carousel__card--next")) {
            next(carousel);
        } else if(target.classList.contains("carousel__card--to")) {
            const [ first ] = carousel.children;
            const pokemonName = first.dataset.name;

            if(pokemonName !== name) navigate(`/`);
        }
    }

    useEffect(() => {
        updatingClass();

        const carousel = carouselRef.current;
        carousel.addEventListener("click", handleClick);
        
        return () => {
            carousel.removeEventListener("click", handleClick);
        }
    }, []);

    return (
        <>
        <div className="wrapper-carousel">
            <div ref={carouselRef} className="carousel">
                {
                    pokemons && pokemons.map(
                        (pokemon, index) => (
                            <Link to={`/pokemon/${pokemon.name}`} key={index} className={`carousel-card`} data-name={pokemon.name}>
                                <p className="card__pokemon-id" data-id={pokemon.id}>{pokemon.id}</p>
                                <p className="card__pokemon-name" data-name={pokemon.name}>{pokemon.name}</p>
                                <GlowUp maskImage={pokemon.image}>
                                    <img className="carousel-card__image" src={pokemon.image} alt={pokemon.name} />
                                </GlowUp>
                            </Link>
                        )
                    )
                }
            </div>
        </div>
        </>
    );
}

export default Carousel3D;