import React, {useEffect, useState, useContext} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import AppContext from '../../AppContextProvider';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import './mission.css'



export default function MissionDetail() {
    const { id } = useParams();
    const [mission, setMission] = useState([]);
    const missionID = {"id" : id}; 
    const {user, setUser, loggedIn} = useContext(AppContext);
    const cookies = new Cookies();
    const username = cookies.get('username');
    const userType = cookies.get('userType');
    const navigate = useNavigate();
    
    useEffect(()=> {

        axios.post("http://localhost:3001/api/mission/find", missionID).then((response) =>{
            setMission(response.data);
        }).catch(()=> {console.log("ERR") } )
   },[]);

    //handling user vote and unvote
    const handleVote = (id) => {
        try{
            const obj = {username, id};
            if(user.arrayOfVoted.includes(id)){
                axios.post("http://localhost:3001/api/mission/unvote", obj).then((res) =>{
                    setUser(res.data[1])
                    console.log(res.data[0].support)
                })
            } else{
                axios.post("http://localhost:3001/api/mission/vote", obj).then((res) =>{
                    setUser(res.data[1])
                    console.log(res.data[0].support)
                })
            }
        }catch(err){
        }
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
                        {mission.title} 
                    </Typography>
                    <Typography variant="body"  component="div" >
                        Mission request by: {mission.author}  <br/>
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Fact Check On: {mission.url}
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Created on: {mission.createdAt}
                    </Typography>
                    <Typography variant="body"  component="div">
                        <p dangerouslySetInnerHTML={{__html: mission.question}}></p>
                        <p dangerouslySetInnerHTML={{__html: mission.backgroundInfo}}></p>
                    </Typography>
                </CardContent>
                <CardActions>
                    {loggedIn && (
                        <Button sx={{backgroundColor: 'rgb(26,38,52)'}} variant="contained" size="small">Vote</Button>
                    ) }

                    {loggedIn ? [ (userType === 'fact checker' 
                        ? <Button sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/mission/${mission._id}/verify`} size="small">Verify</Button>
                        : null ) ] : null
                    }
                </CardActions>

            </Card>
            </div>
        </div>
        );
}
