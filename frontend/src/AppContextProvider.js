import React, {createContext, useEffect, useState} from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const AppContext = createContext();

function AppContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const cookies = new Cookies();
    const username = cookies.get('username');

    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:3001/api/user/loggedIn ");
        setLoggedIn(loggedInRes.data);
    }

    async function getUserData(usernmae){
        if (username){
            const response = await axios.post("http://localhost:3001/api/user/find", {username});
            if (response.status == 200){
                setUser(response.data);
            }
        }else{
            setUser({});
        }
    }

    useEffect (()=>{
        getLoggedIn();
        if (!loggedIn){
            setUser({});
        }
    }, [loggedIn]);

    useEffect (()=>{
        getUserData(username);
    }, []);
    
    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, getLoggedIn, user, setUser}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
export {AppContextProvider};