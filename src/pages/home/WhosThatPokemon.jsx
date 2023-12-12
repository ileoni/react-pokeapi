import { useEffect, useRef, useState } from "react";
import "./WhosThatPokemon.css";

import Input from "../../components/Input";
import Section, { Background, Grid } from "../../main/template/Section";
import ImageMask from "../../components/ImageMask";

import { getRandomPokemon } from "../../services/HomeService";
import { whosThatPokemon } from "../../services/WhosThatPokemonService";

function WhosThatPokemon({pokemons})
{
    const [pokemon, setPokemon] = useState({});
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    const command = "Enter";

    const [loading, setLoading] = useState(false);

    useEffect(() => pokemonRandom(), [pokemons]);

    useEffect(() => {
        if(loading) pokemonRandom();
    }, [loading])

    const keyHandler = ({key}) => {
        if(key === command) {
            whosThatPokemon.data = {
                pokemon,
                input: inputRef,
                image: imageRef
            }
            whosThatPokemon.start(() => setLoading(true));
        };
    }

    const pokemonRandom = () => {
        getRandomPokemon(pokemons).then(setPokemon)
        setLoading(false);
    }


    return (
        <Section>
            <Background  className="home--gradient">
                <Grid cols={true}>
                    <div id="whos-that-pokemon" className="h-whos-that-pokemon__text">
                        <h4 className="font-cairo">Quem é esse</h4>
                        <h1 className="font-cairo font-bold color-red">Pokemon?</h1>
                        <div id="shaking" className="pt-8">
                            <Input inputRef={inputRef} keyDown={keyHandler}/>
                            <small id="message" style={{ visibility: "hidden"}}>Resposta errada!</small>
                        </div>
                    </div>
                    <div className="h-whos-that-pokemon__image">
                        <ImageMask imageRef={imageRef} image={pokemon?.image}>
                            <img src={pokemon?.image} alt="Mostra a imagem de um pokemon aleatório"/>
                        </ImageMask>
                    </div>
                </Grid>
            </Background>
        </Section>
    );
}

export default WhosThatPokemon;