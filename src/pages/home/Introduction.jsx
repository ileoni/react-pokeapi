import "./Introduction.css";

import Section from "../../main/template/Section";

function Introduction ({pokemon})
{
    const pokemonImageInline = {
        "--pokemon-image": `url('${pokemon.sprite}')`
    };

    return (
        <Section>
            <div className="s-text">
                <h4 className="font-cairo">Explore o Universo Pokémon</h4>
                <h1 className="font-cairo font-bold">com nossa <span className="color-red">Pokédex</span></h1>
            </div>
            <div className="s-image" style={pokemonImageInline}>
                <div className="image--masked">
                    <img src={pokemon.sprite} alt={`Contém a image do pokemon ${pokemon.name}`} />
                </div>
            </div>
        </Section>
    );
}

export default Introduction;