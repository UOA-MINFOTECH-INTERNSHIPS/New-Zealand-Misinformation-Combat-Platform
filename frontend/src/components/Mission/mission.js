import React, { useContext, useState, useEffect} from 'react';
import './mission.css';
import { Cookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import AppContext from '../../AppContextProvider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";



export default function Mission({data, totalPage}) {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const userType = cookies.get('userType');
    const {user, setUser, loggedIn} = useContext(AppContext);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [display, setDisplay] = useState([]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(()=>{
        const req = {data, page}
        axios.post("http://localhost:3001/api/mission/find_missions", req).then((res)=> { 
            console.log(res)
        })

    },[])


    const handleVote = (id) => {
        try{
            console.log(id)
            const obj = {username, id};
            console.log(user.arrayOfVoted.includes(id))
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
        <div className='missioncard'>
            { data.map((val)=> (
                <Card key={val._id} sx={{mb:3, p:2}}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {val.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Request Fact Check On: {val.url}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Request Created on: {val.createdAt}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {val.question}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        {loggedIn ? [ (user.arrayOfVoted.includes(val._id) 
                            ? <Button sx={{backgroundColor: 'rgb(233, 183, 91)'}} variant="contained" onClick={(e) => {handleVote(val._id)}} size="small"> Unvote</Button>
                            : <Button sx={{backgroundColor: 'rgb(26,38,52)' }} variant="contained" onClick={(e) => {handleVote(val._id)}} size="small"> Vote</Button>
                            ) ] : null
                        }
                        {loggedIn ? [ (userType == 'fact checker' 
                            ? <Button sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/MissionCheck/${val._id}`} size="small">Verify</Button>
                            : null ) ] : null
                        }
                        <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/mission/${val._id}/read` } size="small"> Read more</Button>
                    </CardActions>
                </Card>
            ) ) } 

            <div className='pagination'>
                <Pagination className="page" defaultPage={1} count={totalPage} page={page} onChange={handleChange} variant="outlined" />
            </div>
        </div>
    )
}
