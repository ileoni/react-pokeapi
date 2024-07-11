import { useEffect, useState } from 'react';
import './Details.css';

import { getPokemonDetails } from '../../services/DetailsService';
import Introduction from './Introduction';
import Features from './Features';
import Stats from './Stats';
import Evolutions from './Evolutions';

import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';

function Details()
{   
    const { name } = useParams();

    const [loading, isLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const endpoint = `/pokemon/${name}`;
        
        getPokemonDetails(endpoint)
            .then(setPokemon)
            .then(_ => isLoading(true));
    }, [name])

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