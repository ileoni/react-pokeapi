import { useEffect, useState } from 'react';
import './Details.css';

import { getPokemonDetails } from '../../services/DetailsService';
import Introduction from './Introduction';
import Features from './Features';
import Stats from './Stats';
import Evolutions from './Evolutions';

import Loading from '../../components/Loading';

function Details()
{   
    const [loading, isLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);

    let endpoint = String(location.pathname).replace('/react-pokeapi/', '/');;

    useEffect(() => {
        getPokemonDetails(endpoint)
            .then(setPokemon)
            .then(_ => isLoading(true));
    }, [])

    return (
        <>
        {
            !loading && <Loading></Loading>
        }
        {
            loading && (
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