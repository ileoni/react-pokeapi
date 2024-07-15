import { useEffect, useRef, useState } from "react";
import "./WhosThatPokemon.css";

import Input from "../../components/Input";
import Section, { Background, Grid } from "../../main/template/Section";

import { getPokemonRandom } from "../../services/ApiPokemonService";
import { whosThatPokemon } from "../../services/WhosThatPokemonService";
import GlowUp from "../../components/GlowUp";

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
        getPokemonRandom(pokemons).then(pokemon => setPokemon(pokemon));
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
                        <GlowUp imageRef={imageRef} maskImage={pokemon?.sprite}>
                            <img src={pokemon?.sprite} alt="Mostra a imagem de um pokemon aleatório"/>
                        </GlowUp>
                    </div>
                </Grid>
            </Background>
        </Section>
    );
}

export default WhosThatPokemon;