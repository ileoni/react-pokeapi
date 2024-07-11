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

    // HashRouter
    let endpoint = String(location.hash).replace('#/', '/');
    endpoint = location.pathname.replace(import.meta.env.BASE_URL, "");

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