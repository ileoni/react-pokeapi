import { ScrollRestoration } from "react-router-dom";

import { H1 } from "../components/H1";
import { H4 } from "../components/H4";
import { Loading } from "../components/Loading";
import { usePokeapi } from "../hooks/usePokeapi";
import Row from "../components/Row";
import Pikachu from "../assets/pikachu.webp";
import Pokedex from "../components/Pokedex";
import WhosThatPokemon from "../components/WhosThatPokemon";

function Home() {
    const { pokemons } = usePokeapi();
    const { loading } = pokemons;

    return (
        <>
            <Row>
                <Row.MaxW5xl className="min-h-fit py-10 grid sm:grid-cols-2 items-center">
                    <img src={Pikachu} alt="pikachu" className="justify-self-center sm:justify-self-start row-start-2 sm:row-start-auto w-56 sm:w-96"/>
                    <div>
                        <H4 className="text-center sm:text-left">Explore o Universo Pokémon</H4>
                        <H1 className="text-center sm:text-left">com nossa <span className='text-primary-300'>Pokédex</span></H1>
                    </div>
                </Row.MaxW5xl>
            </Row>
            <Row.Background>
                <Row.SpikesTop className="fill-base-600"/>
                <Row.MaxW5xl className="">
                    <Loading loading={loading}>
                        <div className="min-h-96 grid sm:grid-flow-col sm:justify-between items-center">
                            <WhosThatPokemon />
                        </div>
                    </Loading>
                </Row.MaxW5xl>
                <Row.SpikesBottom className="fill-base-400"/>
            </Row.Background>
            <Row className="bg-base-400">
                <Row.MaxW5xl className="">
                    <Loading loading={loading}>
                        <Pokedex />
                    </Loading>
                </Row.MaxW5xl>
            </Row>
            <ScrollRestoration/>
        </>
    )
}

export default Home;