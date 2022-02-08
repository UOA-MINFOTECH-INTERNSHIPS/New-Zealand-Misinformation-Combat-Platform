import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './results.css'



export default function MissionDetail() {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const ResultID = {"id" : id}; 
    const navigate = useNavigate();


    useEffect(()=> {
        axios.post("http://localhost:3001/api/result/find", ResultID).then((response) =>{
            setResult(response.data);
        })
    }, []);

     
    const handleBack = () => {
    }

    return (
        <div className='detailContainter'>

            <div className='returnBtn'>
                <Button variant="outlined" onClick={(e)=>{navigate(-1)}}> Back </Button>
            </div>
            <div className='missionDetail'>

            <Card sx={{mb:3, p:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {result.title} 
                    </Typography>
                    <Typography variant="body"  component="div" >
                        Verified by: {result.author}  <br/>
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Fact Check On: {result.url}
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Created on: {result.createdAt}
                    </Typography>
                    <Typography variant="body"  component="div">
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </div>
        );
}
