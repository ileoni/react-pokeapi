import { useEffect, useState } from 'react';
import './Details.css';

import { getPokemonDetails } from '../../services/DetailsService';
import Introduction from './Introduction';
import Features from './Features';
import Stats from './Stats';
import Evolutions from './Evolutions';

function Details()
{   
    const [pokemon, setPokemon] = useState(null);

    const endpoint = location.pathname;
    useEffect(() => {
        getPokemonDetails(endpoint).then(setPokemon);
    }, [])

    return (
        <>
        {
            pokemon && (
                <>
                    <Introduction pokemon={pokemon}/>
                    <Features pokemon={pokemon} />
                    <Stats pokemon={pokemon} />
                    <Evolutions pokemon={pokemon}/>
                </>
            )
        }
        </>
    );
}

export default Details;