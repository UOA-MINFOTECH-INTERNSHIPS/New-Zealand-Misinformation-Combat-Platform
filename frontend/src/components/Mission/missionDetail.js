import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import './mission.css'



export default function MissionDetail() {
    const { id } = useParams();
    const [mission, setMission] = useState([]);
    const missionID = {"id" : id}; 


    useEffect(()=> {
        axios.post("http://localhost:3001/api/mission/find", missionID).then((response) =>{
            setMission(response.data);
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
                        <h2>{mission.title}</h2>
                        <p><strong>Author: </strong>&nbsp;{mission.author} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <strong>Mission created:&nbsp;</strong> {mission.createdAt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>Recent update:&nbsp;</strong> {mission.updatedAt}</p>
                        <p><strong>Potential false URL:&nbsp;</strong> {mission.url}</p>
                        <p><strong>Description</strong></p>
                        <p>{mission.backgroundInfo}</p>

                    </div>


                </div>

            </div>
        </div>
        );
}
