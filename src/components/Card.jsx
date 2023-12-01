import "./Card.css";

function Card({pokemon})
{
    const { id, name, sprite } = pokemon;

    const pokemonImageInline = {
        "--pokemon-image": `url('${sprite}')`
    };

    return (
        <div className="wrapper__card" style={pokemonImageInline}>
            <div className="image--masked">
                <img src={sprite} alt={name} className="card__image" />
            </div>
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