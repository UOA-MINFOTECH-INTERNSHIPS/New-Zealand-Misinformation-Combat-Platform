import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContextProvider';
import axios from 'axios';

export default function UserLiked() {
    const {user} = useContext(AppContext);
    console.log(user.arrayOfLiked);
    const [liked, setLiked] = useState([]);


    console.log(liked)

    return (
        <div>
            hi
        </div>
    )
}
