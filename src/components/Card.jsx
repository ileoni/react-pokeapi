import "./Card.css";
import ImageMask from './ImageMask';

function Card({pokemon})
{
    const { id, name, image } = pokemon;

    return (
        <>
            <div className="wrapper__card">
                <div className="card__image">{
                    <ImageMask image={image}>
                        <img src={image} alt={name} />
                    </ImageMask>
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