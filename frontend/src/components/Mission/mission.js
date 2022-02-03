import React, {useState, useContext} from 'react';
import './mission.css';
import { Cookies } from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import AppContext from '../../AppContextProvider';
import Button from '@mui/material/Button';


export default function Mission({data}) {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const userType = cookies.get('userType');
    const {user, setUser, loggedIn} = useContext(AppContext);
    const navigate = useNavigate();

    console.log(user)

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
                <div className='card'>
                    <div >
                        <h3>{val.title}</h3>
                        <p> Fact checking on: {val.url} </p>
                        <p>Created on: {val.createdAt}</p>
                    </div>

                    <div className='missionbtn'>
                        
                    { loggedIn
                        ? [
                            (user.arrayOfVoted.includes(val._id) 
                                ? <Button sx={{backgroundColor: 'rgb(233, 183, 91)'}} variant="contained" onClick={(e) => {handleVote(val._id)}} size="small"> Unvote</Button>
                                : <Button sx={{backgroundColor: 'rgb(26,38,52)' }} variant="contained" onClick={(e) => {handleVote(val._id)}} size="small"> Vote</Button>
                            )
                        ]
                        : null
                        }
                        <div className='votes'>
                        <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)',  mx: 2 }} variant="contained" href= {`/mission/${val._id}/read` } size="small"> Read more</Button>
                        { loggedIn 
                            ? [
                                (userType == 'fact checker' 
                                    ? <Button sx={{backgroundColor: 'rgb(26,38,52)'}} variant="contained" href= {`/MissionCheck/${val._id}`} size="small">Verify</Button>
                                    : null 
                                ) 
                            ] : null
                        }
                        </div>
                    </div>
                </div>
            ) ) } 
        </div>
    )
}
