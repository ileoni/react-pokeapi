import { createContext, useReducer, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({children}) {
    const [heFinished, setHeFinished] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    return (
        <AppContext.Provider value={{
            heFinished, setHeFinished,
            currentIndex, setCurrentIndex
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;