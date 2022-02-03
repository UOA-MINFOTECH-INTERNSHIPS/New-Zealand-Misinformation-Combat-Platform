import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContextProvider';
import axios from 'axios';

export default function UserLiked() {
    const {user} = useContext(AppContext);
    console.log(user.arrayOfLiked);
    const [liked, setLiked] = useState([]);

    useEffect( () => {
        
        for (let i = 0; i < user.arrayOfLiked.length; i++) {
            console.log(i);
            console.log(user.arrayOfLiked[i]);
            const ResultID = {"id" : user.arrayOfLiked[i]}; 
            axios.post("http://localhost:3001/api/result/find", ResultID).then((res)=> {
                console.log(res.data);
                setLiked(liked.concat(res.data)); 
            })

        }
    }, [])

    console.log(liked)

    return (
        <div>
            hi
        </div>
    )
}
