import { useEffect, useRef, useState } from "react";
import "./WhosThatPokemon.css";

import Section from "../../main/template/Section";
import Input from "../../components/Input";
import { randomPokemon } from "../../services/PokeapiService";
import { whosThatPokemon } from "../../services/WhosThatPokemonService";

function WhosThatPokemon({pokemons})
{
    const [pokemon, setPokemon] = useState({});
    const inputRef = useRef(null);
    const spriteRef = useRef(null);
    const command = "Enter";

    const [loading, setLoading] = useState(false);

    useEffect(() => pokemonRandom(), []);

    useEffect(() => {
        if(loading) pokemonRandom();
    }, [loading])

    const keyHandler = ({key}) => {
        if(key === command) {
            whosThatPokemon.data = {
                pokemon, inputRef, spriteRef
            }
            whosThatPokemon.start(() => setLoading(true));
        };
    }

    const pokemonRandom = () => {
        const pokemon = randomPokemon(pokemons)
        setPokemon(pokemon);
        setLoading(false);
    }


    return (
        <Section>
            <div id="whos-that-pokemon" className="s-whos-that-pokemon__background"></div>
            <div className="s-text">
                <h4 className="font-cairo">Quem é esse</h4>
                <h1 className="font-cairo font-bold color-red">Pokemon?</h1>
                <div id="shaking" className="pt-8">
                    <Input inputRef={inputRef} keyDown={keyHandler}/>
                    <small 
                        id="message"
                        style={{
                            visibility: "hidden"
                        }}
                    >Resposta errada!</small>
                </div>
            </div>   
            <div 
                ref={spriteRef}
                className="s-image s-whos-that-pokemon__image" 
                style={{
                    "--pokemon-image": `url(${pokemon?.sprite})`
                }}
            >
                <div className="image--masked"> 
                    <img 
                        src={pokemon?.sprite}
                        alt="Mostra a imagem de um pokemon aleatório"
                    />
                </div>
            </div>
        </Section>
    );
}

export default WhosThatPokemon;