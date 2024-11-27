import { createContext } from "react";
import { usePokemons } from "../hooks/usePokemons";

export const AppContext = createContext();

function AppContextProvider({children}) {
    // const { data, loading, fetchMore } = usePokemons();
    const { data, loading, fetchMore } = usePokemons();
    
    return <AppContext.Provider value={{
        data, loading, fetchMore
    }}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;