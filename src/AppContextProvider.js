import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

const AppContext = createContext();

function AppContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    console.log(loggedIn);

    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:3001/api/user/loggedIn ");
        setLoggedIn(loggedInRes.data);
    }

    useEffect (()=>{
        getLoggedIn();
    }, []);
    
    return (
        <AppContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
export {AppContextProvider};