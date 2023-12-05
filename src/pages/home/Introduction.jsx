import "./Introduction.css";

import Section from "../../main/template/Section";
import ImageMask from "../../components/ImageMask";

function Introduction ({pokemon})
{
    return (
        <Section>
            <div className="s-text">
                <h4 className="font-cairo">Explore o Universo Pokémon</h4>
                <h1 className="font-cairo font-bold">com nossa <span className="color-red">Pokédex</span></h1>
            </div>
            <ImageMask image={pokemon.sprite} >
                <img src={pokemon.sprite} alt={`Contém a image do pokemon ${pokemon.name}`} />
            </ImageMask>
        </Section>
    );
}

export default Introduction;