import Recommend from "@mui/icons-material/Recommend";
import React, { useState } from 'react';

export default function Recommendation (){
    const [Recommend, setRecommendation] = useState('');
    return (
        <div>
            <p> this is recommendation page</p>
            <p> {Recommend}</p>
            <button onClick={() => setRecommendation(Recommend + "recommended")}>recommendation</button>

        </div>
    )
}