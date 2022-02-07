import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, {useState, useEffect, useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import AppContext from '../../AppContextProvider';
import './mission.css';
import { Cookies } from 'react-cookie';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import parse from "html-react-parser";

  
export default function Missions() {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const userType = cookies.get('userType');
    const {user, setUser, loggedIn} = useContext(AppContext);
    const [missionList, setMissionList] = useState([]);
    const [display, setDisplay] = useState([]);
    const [totalPage, setTotalPage] = useState(1); 
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const start = (page-1) * 20; 
    const end = page * 20;

    useEffect(()=> {
        const temp = {username} 
        axios.post("http://localhost:3001/api/user/find", temp).then((res)=> { 
            setUser(res.data)
        })

        axios.get("http://localhost:3001/api/mission/missionNum").then((res)=> {
            setTotalPage(Math.ceil(res.data/20));
        })

        axios.get("http://localhost:3001/api/mission/all").then((res)=> {
            setMissionList(res.data);
            setDisplay(res.data.slice(start,end));
        }).catch(()=> {console.log("ERR") } )
   }, []);
   

    //pagination
    useEffect(()=>{
        setDisplay(missionList.slice(start,end));
    },[page])


   //handling page change
    const handleChange = (event, value) => {
        setPage(value);
        setDisplay(missionList.slice(start,end));
        window.scrollTo(0, 0);
    };


    //handle search bar 
    const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newFilter = missionList.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        setDisplay(newFilter);
        console.log('display : ' + newFilter)
        if(newFilter.length == 0) {
            setTotalPage(1);
        }else setTotalPage(Math.ceil(newFilter.length/20));
    }
    
    const handleRequest = () => {
        if (loggedIn) {
            navigate('/NewMission')
        }else {
            alert('You are not logged in')
            navigate('/signin')
        }
    }

    //handling user vote and unvote
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
        <div className='missionContainer'>

            <div className='missions'>
                <div className='mission'>
                    <p className='title'> Missions 
                    <button className='requestBtn' onClick={handleRequest}> I want to request </button>

                    </p>
                    <div className='missionSearch'>
                        <input type='text' placeholder= "Search here ..." onChange={handleSearch} /> 
                    </div>

                    <div className='missionRadioBtn'>
                        <RadioGroup row aria-label="sort" name="row-radio-buttons-group">
                            <FormControlLabel value="popular" control={<Radio />} label="Sort by popularity" />
                            <FormControlLabel value="time" control={<Radio />} label="Sort by time" />
                        </RadioGroup>
                    </div>
                </div>

                <div className='missionContent'>
                    { display.map((val, key)=> (
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
                                    {parse(val.question)}
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
            </div>
            


        </div>
    )
}
