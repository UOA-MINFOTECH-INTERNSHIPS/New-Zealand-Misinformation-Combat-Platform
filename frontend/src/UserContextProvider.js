import React, {createContext, useEffect, useState} from 'react';


const UserContext = createContext();

function UserContextProvider(props) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
export {UserContextProvider};