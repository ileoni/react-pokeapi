import { useState, useEffect, createContext } from 'react';

import { fetchData } from '../services/ApiPokemonService';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchData()
            .then(data => setPokemons(data));
    }, [])

    
    return (
        <AppContext.Provider value={{ 
            pokemons 
        }}>
            {children}
        </AppContext.Provider>
    );
}