import { useEffect, useRef } from 'react';
import './Carousel.css';
import ImageMask from './ImageMask';

function Carousel({ activated, evolutions })
{
    const carousel = useRef(null);

    useEffect(() => {
        const {children} = carousel.current;
        initial(children);
    })

    const initial = (records) => {
        const {length} = records;
        const [activated] = [...records].filter(({classList}) => classList.contains('carousel__item--activated'));
        const width = activated.clientWidth;

        const prev = activated.previousElementSibling;
        const next = activated.nextElementSibling;

        if(prev) {
            prev.style.transform = `translatex(-${width}px)`;
        } else {
            records[length - 1].style.transform = `translatex(-${width}px)`;
        }

        if(next) {
            next.style.transform = `translatex(${width}px)`;
        } else {
            records[0].style.transform = `translatex(${width}px)`;
        }

        activated.style.transform = `translatex(0)`
    }

    useEffect(() => {
        const {children} = carousel.current;
        [...children].map(child => {
            child.addEventListener('click', () => {
                choose(child, 'carousel__item--activated');
                initial(children);
            })
        })
    }, [])

    const choose = (child, className) => {
        const {children} = carousel.current;
        [...children].map(({classList}) => classList.remove(className))
        child.classList.add(className);
    }

    return (
        <>
        <div ref={carousel} className="carousel">
            {
                evolutions?.map(({name, sprite}, index) => (
                    <div 
                        key={index} 
                        className={`carousel__item ${activated === name ? 'carousel__item--activated': ''}`}
                    >
                        <ImageMask image={sprite}>
                            <img className="carousel__image" src={sprite} alt={`imagem do pokemon ${name}`} />
                        </ImageMask>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default Carousel;