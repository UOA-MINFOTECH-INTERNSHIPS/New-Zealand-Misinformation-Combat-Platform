import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './registerForm.css'
import FactChecker from "./factCheckerRegister"

export default function registerPage() {
 //   const [IsFactchecker, setIsFactChecker] = useState("");

    return(
        <div className='selection'>
            <h1>What roles do you want to become</h1>
            <div className='TypeBtn'>
                <Button variant="outlined" sx={{mr: 20 }}>Normal User</Button>
    
                <Button variant="outlined" >Fact Checker</Button>
                
            </div>
        </div>
    )
}