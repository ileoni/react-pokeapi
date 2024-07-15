import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

import { getPokemon } from '../../services/ApiPokemonService';
import { AppContext } from '../../contexts/app-context';

import Introduction from './Introduction';
import Features from './Features';
import Stats from './Stats';
import Evolutions from './Evolutions';


function Details()
{   
    const { pokemons } = useContext(AppContext)
    const [pokemon, setPokemon] = useState(null);

    const { name } = useParams();
    
    useEffect(() => {
        getPokemon(pokemons, name).then(pokemon => setPokemon(pokemon))
    }, [name])

    return (
        <>
        {
            pokemon != null && (
                <>
                    <Introduction pokemon={pokemon}/>
                    <Features pokemon={pokemon}/>
                    <Stats pokemon={pokemon}/>
                    <Evolutions pokemon={pokemon}/>
                </>
            )
        }
        </>
    );
}

export default Details;