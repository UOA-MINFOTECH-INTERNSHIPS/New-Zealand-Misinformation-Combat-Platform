import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './registerForm.css'
import FactChecker from "./factCheckerRegister"
import NormalUser from './registerForm';

export default function RegisterPage() {
    const [showNormForm, setShowNorm] = useState(false);

    function handleShowNorm () {
        setShowNorm(!showNormForm);
        console.log(showNormForm)
    }

    //useEffect

    return(
        <div className='selection'>
            <h1>What roles do you want to become</h1>
            <div className='TypeBtn'>
                <Button variant="outlined" sx={{mr: 20 }} onclick = {()=>handleShowNorm()} >Normal User</Button>
                <Button variant="outlined" onclick ={()=>handleShowNorm()} >Fact Checker</Button>
            </div>
            {showNormForm ?  <NormalUser/>: <FactChecker/>} 
        </div>
    )
}