import "./Card.css";
import GlowUp from "./GlowUp";

function Card({pokemon})
{
    const { id, name, sprite } = pokemon;

    return (
        <>
            <div className="wrapper__card">
                <div className="card__image">{
                    <GlowUp maskImage={sprite}>
                        <picture>
                            <source type="image/webp" srcSet={sprite} />
                            <img loading="lazy" src={sprite} alt={`imagem do ${name}`} />
                        </picture>
                    </GlowUp>
                }</div>
                <div className="card__content">
                    <span className="card__name font-16 capitalize">{name}</span>
                    <span className="card__number font-12">{id}</span>
                    <span className="card__icon"><i className="pokeball"></i></span>
                </div>
            </div>
        </>
    );
}

export default Card;