import {Link} from 'react-router-dom'
import React, {useState, useEffect, useContext} from 'react'
import './home.css'
import axios from 'axios';
import Button from '@mui/material/Button';
import bkImg from '../Image/bkimg.jpg'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AppContext from '../../AppContextProvider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Cookies } from 'react-cookie';


const useStyles = makeStyles({
    button: {
      width:'100%',
      backgroundColor: '#1A2634',
      marginBottom:'20px',
      color: '#fff',
      fontSize: '15px',
      '&:hover': {
        backgroundColor: 'rgba(192, 142, 49)',
        color: 'black',
    },
  }})

export default function Home() {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const classes = useStyles();
    const [newest, setNewest] = useState([]);
    const [mission, setMission] = useState([]);
    const [page, setPage] = useState(1);
    const { user, setUser, loggedIn} = useContext(AppContext)

    useEffect(()=> {
        const temp = {username} 
        axios.post("http://localhost:3001/api/user/find", temp).then((res)=> { 
            setUser(res.data)
        })

        const pageNum ={page};
        axios.post("http://localhost:3001/api/result/resultlist", pageNum)
       .then((response) =>{
        setNewest(response.data.results.slice(0,5));
        })
       .catch(()=> {console.log("ERR") } )

        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
        setMission(response.data.results.slice(0,10));
        })
       .catch(()=> {console.log("ERR") } )

   }, []);

   const handleLike = (id) => {
    try{
        const username = user.username;
        const obj = {username, id};
        if(user.arrayOfLiked.includes(id)){
            axios.post("http://localhost:3001/api/result/unlike", obj).then((res) =>{
                if(res.data != "you already like this result"){
                    setUser(res.data)
                }
            })
        } else{
            axios.post("http://localhost:3001/api/result/like", obj).then((res) =>{
            setUser(res.data)
            })
        }
    }catch(err){
    }
    
}

    return (
        <div className='home'>
            <img className='bkimg' src={bkImg}/>

            <div className='container'>
                <div className='newest'>
                    <h1>What's new</h1><br/>
                    { newest.map((val, key)=> (
                        <Card key={val._id} sx={{mb:3, p:2}}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {val.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Fact checking article Number: {val.url}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {val.analysis}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {val.author}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                {loggedIn && (user.arrayOfLiked.includes(val._id) ? <FavoriteIcon color="error" />: <FavoriteBorderIcon />)}
                                { loggedIn &&  <i onClick={(e) => {handleLike(val._id)}}><ThumbUpIcon /></i> }
                                <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/result/${val._id}/read`} size="small"> Read more</Button>
                            </CardActions>
                        </Card>

                    ) ) } 
                    <Button className={classes.button} size="small" href= {`/result`} sx={{backgroundColor: 'rgb(26,38,52)' }}>View more</Button>

                </div>

                <div className='popular'>
                    <h1>Popular fact<WhatshotIcon sx={{color:'red', fontSize:'30px'}}/></h1> <br/> 
                    {
                        mission.map ((val, key) => (
                            <div className='popularItem'>{val.question}</div>
                        ))
                    }
                    <Button className={classes.button} size="small" href= {`/result`} sx={{backgroundColor: 'rgb(26,38,52)' }}>View more</Button>

                </div>

            </div>
        </div>
    )
}
