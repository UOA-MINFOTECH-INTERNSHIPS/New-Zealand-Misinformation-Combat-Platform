import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './registerForm.css'
import FactChecker from "./factCheckerRegister"
import NormalUser from './registerForm';

export default function RegisterPage() {
    const [showNormForm, setShowNorm] = useState(true);

    function handleShowNorm () {
        setShowNorm(!showNormForm);
        console.log(showNormForm)
    }


    return(
        <div>
            <h1 className='heading'>What roles do you want to become</h1>
            <div className='TypeBtn'>
                <Button variant="outlined" sx={{mr: 20 }} onClick = {()=>handleShowNorm()} >Normal User</Button>
                <Button variant="outlined" onClick ={()=>handleShowNorm()} >Fact Checker</Button>
            </div>
            <br/>
            <div className='form'>
            {showNormForm ? <NormalUser/>: <FactChecker/>} 
            </div>
        </div>
    )
}