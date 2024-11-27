import { Link } from 'react-router-dom';

import { usePokemons } from '../hooks/usePokemons';
import Pikachu from "../assets/pikachu.png";
import Section from '../components/ui/Section';
import WhosThatPokemon from '../components/WhosThatPokemon';
import Pokedex from '../components/Pokedex';
import { useMemo } from 'react';

function Home() {
    const { data, loading, fetchMore } = usePokemons();
    
    return (
        <>
            <Section>
                <div className="grid md:grid-cols-2 items-center content-center">
                    <div>
                        <h4 className='font-bold font-roboto'>
                            Explore o Universo Pokémon
                        </h4>
                        <h1 className='font-bold font-cairo'>
                            com nossa <span className='text-red-primary'>Pokédex</span>
                        </h1>
                    </div>
                    <div className='justify-self-end'>
                        <img className='' src={Pikachu} alt="pokemon pikachu" width={380}/>
                    </div>
                </div>
            </Section>
            <WhosThatPokemon data={data} loading={loading} />
            <Pokedex data={data} loading={loading} fetchMore={fetchMore}/>
        </>
    );
}

export default Home;