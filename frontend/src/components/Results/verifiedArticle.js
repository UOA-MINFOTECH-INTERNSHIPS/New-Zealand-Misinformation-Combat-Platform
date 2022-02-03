import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import './results.css'



export default function MissionDetail() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const ResultID = {"id" : id}; 


    useEffect(()=> {
        axios.post("http://localhost:3001/api/result/find", ResultID).then((response) =>{
            setResult(response.data);
        })
    }, []);

     
    const handleBack = () => {
    }

    return (
        <div>
            
            <div className='returnBtn'>
                <Link to='/mission'><Button variant="outlined"> Back </Button></Link>
            </div>

            <div className='missionDetailContainers'>
                <div className='missionContent'>
                    
                    <div >
                        <h2>{result.title}</h2>
                        <p><strong>Author: </strong>&nbsp;{result.author} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <strong>Mission created:&nbsp;</strong> {result.createdAt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>Recent update:&nbsp;</strong> {result.updatedAt}</p>
                        <p><strong>Potential false URL:&nbsp;</strong> {result.url}</p>
                        <p><strong>Description</strong></p>
                        <p>{result.backgroundInfo}</p>
                    </div>


                </div>

            </div>
        </div>
        );
}
