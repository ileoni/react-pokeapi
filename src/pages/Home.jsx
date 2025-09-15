import { H1 } from "../components/H1";
import { H4 } from "../components/H4";
import Row from "../components/Row";
import Pikachu from "../assets/pikachu.png";
import WhosThatPokemon from "../components/WhosThatPokemon";
import Pokedex from "../components/Pokedex";

function Home() {
    return (
        <>
            <Row>
                <Row.MaxW5xl className="min-h-fit py-10 grid sm:grid-cols-2 items-center">
                    <img src={Pikachu} alt="pikachu" className="justify-self-center sm:justify-self-start row-start-2 sm:row-start-auto w-56 sm:w-96 -scale-x-100"/>
                    <div>
                        <H4 className="font-bold text-center sm:text-left">Explore o Universo Pokémon</H4>
                        <H1 className="font-bold text-center sm:text-left">com nossa <span className='text-primary-300'>Pokédex</span></H1>
                    </div>
                </Row.MaxW5xl>
            </Row>
            <Row.Background>
                <Row.SpikesTop className="fill-base-600"/>
                <Row.MaxW5xl className="grid sm:grid-flow-col sm:justify-between items-center">
                    <WhosThatPokemon />
                </Row.MaxW5xl>
                <Row.SpikesBottom className="fill-base-400"/>
            </Row.Background>
            <Row className="bg-base-400">
                <Row.MaxW5xl className="min-h-screen">
                    <Pokedex />
                </Row.MaxW5xl>
            </Row>
        </>
    )
}

export default Home;