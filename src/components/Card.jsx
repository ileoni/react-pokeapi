import "./Card.css";
import ImageMask from './ImageMask';

function Card({pokemon})
{
    const { id, name, sprite } = pokemon;
    
    return (
        <div className="wrapper__card">
            <ImageMask image={sprite}>
                <img src={sprite} alt={name} className="card__image" />
            </ImageMask>
            <div className="card__text">
                <span className="card__name font-cairo">
                    {name}
                </span>
                <span className="card__number color-red font-12">
                    Nº {id}
                </span>
                <i className="card__pokebola"></i>
            </div>
        </div>
    );
}

export default Card;