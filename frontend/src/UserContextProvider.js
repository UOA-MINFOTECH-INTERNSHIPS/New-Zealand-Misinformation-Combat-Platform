import React from 'react';
import useUser from './hooks/useUser';

export const UserContext = React.createContext({
    userBox: []
});

export function UserContextProvider({ children }) {

    const { user, createNewUser, isLoading } = useUser();

    return (
        <UserContext.Provider value={{ user, createNewUser, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}