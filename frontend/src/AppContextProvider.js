import React from 'react';
import useUser from './hooks/useUser';

export const AppContext = React.createContext({
    userBox: []
});

export function AppContextProvider({ children }) {

    const { user, createNewUser, deleteAllUser, isLoading } = useUser();

    return (
        <AppContext.Provider value={{ user, createNewUser, deleteAllUser, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}