import Recommend from "@mui/icons-material/Recommend";
import React, { useState } from 'react';
import Navbar from "./Navigation/Navbar";

export default function Recommendation (){
    const [Recommend, setRecommendation] = useState('');
    return (
        <div>
            <Navbar/>
            <p> this is recommendation page</p>
            <p> {Recommend}</p>
            <button onClick={() => setRecommendation(Recommend + "recommended")}>recommendation</button>

        </div>
    )
}