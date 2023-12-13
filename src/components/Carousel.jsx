import { useEffect, useRef } from 'react';
import './Carousel.css';
import ImageMask from './ImageMask';

function Carousel({ pokemonName, evolutions })
{
    const carousel = useRef(null);

    useEffect(() => {
        const {children} = carousel.current;
        initial(children);
    })
    
    const data = ({previousElementSibling, nextElementSibling, clientWidth}) => {
        return {
            prev: previousElementSibling,
            next: nextElementSibling,
            width: clientWidth,
            nagativeWidth: clientWidth * -1,
        }
    }

    const first = (records) => records.at(0)

    const last = (records) => records.at(-1)

    const isActivated = ({classList}) => classList.contains('carousel__item--activated')

    const translateX = (element, width) => element.style.transform = `translatex(${width}px)`;

    const initial = (records) => {
        const arrayFromRecords = Array.from(records);
        const start = first(arrayFromRecords);
        const end = last(arrayFromRecords);
        const activated = arrayFromRecords.find(isActivated);

        const {prev, next, width, nagativeWidth} = data(activated);

        (prev) ? translateX(prev, nagativeWidth): translateX(end, nagativeWidth);

        (next) ? translateX(next, width): translateX(start, width);
       
        translateX(activated, 0);
    }

    useEffect(() => {
        const {children} = carousel.current;
        Array.from(children).map(child => {
            child.addEventListener('click', () => {
                toggleClasse(child, 'carousel__item--activated');
                initial(children);
            })
        })
    }, [])

    const toggleClasse = (child, className) => {
        const {children} = carousel.current;
        Array.from(children).map(({classList}) => classList.remove(className))
        child.classList.add(className);
    }

    return (
        <>
        <div ref={carousel} className="carousel">
            {
                evolutions?.map(({name, image}, index) => (
                    <div 
                        key={index}
                        className={`carousel__item ${pokemonName === name && 'carousel__item--activated'}`}
                    >
                        <ImageMask image={image}>
                            <img className="carousel__image" src={image} alt={`imagem do pokemon ${name}`} />
                        </ImageMask>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default Carousel;