import React from 'react';
import usePokemon from './hooks/usePokemon';

export const AppContext = React.createContext({
    pokemonBox: []
});

export function AppContextProvider({ children }) {

    const { pokemon, catchRandomPokemon, releaseAllPokemon, isLoading } = usePokemon();

    return (
        <AppContext.Provider value={{ pokemon, catchRandomPokemon, releaseAllPokemon, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}