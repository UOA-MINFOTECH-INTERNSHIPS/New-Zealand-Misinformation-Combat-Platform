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


export default function Home() {
    const [newest, setNewest] = useState([]);
    const [mission, setMission] = useState([]);
    const [page, setPage] = useState(1);
    const { user, setUser, loggedIn} = useContext(AppContext)

    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/result/resultlist", pageNum)
       .then((response) =>{
        setNewest(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )

        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
        setMission(response.data.results);
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
                        <div className='card'>
                            <div >
                                <p>
                                    {val.title}
                                    </p>

                                    <p> Fact checking article Number: 
                                    {val.url}
                                    </p>
                                    <p>{val.analysis}</p>
                                    <p>
                                Fact Checked by: {val.author}
                                </p>
                            </div>

                            <div >
                            {loggedIn &&  
                                (user.arrayOfLiked.includes(val._id) ? <FavoriteIcon color="error" />: <FavoriteBorderIcon />) 
                            }
                            { loggedIn &&  
                                <i onClick={(e) => {handleLike(val._id)}}><ThumbUpIcon /></i>
                            }
                                <Link className='readmore' to= {`/result/${val._id}/read`}>Read more</Link> 
                            </div>
                        </div>
                    ) ) } 
                    <Button className='btn' size="small"><a href= {`/result`}>View more</a></Button>

                </div>

                <div className='popular'>
                    <h1>Popular fact<WhatshotIcon sx={{color:'red', fontSize:'30px'}}/></h1> <br/> 
                    {
                        mission.map ((val, key) => (
                            <div className='popularItem'>{val.question}</div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
