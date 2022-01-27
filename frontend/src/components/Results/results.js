import React , { useContext, useEffect, useState }from 'react';
import './results.css';
import { Cookies } from 'react-cookie';
import {Link} from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AppContext from '../../AppContextProvider';


export default function Mission({data}) {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const {user, setUser, loggedIn} = useContext(AppContext); 

    const handleLike = (id) => {
        try{
            const obj = {username, id};
            if(user.arrayOfLiked.includes(id)){
                axios.post("http://localhost:3001/api/result/unlike", obj).then((res) =>{
                    console.log(res)
                        setUser(res.data)
                    
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
        <div className='resultContainer'>
            { data.map((val, key)=> (
                <div className='resultCard'>
                    <div >
                        <p><VerifiedIcon className='red'/>Verification result place holder</p>
                        <h3>{val.title}</h3>
                        <p> Fact checking on: {val.url} </p>
                        <p>Created on: {val.createdAt}</p>
                    </div>

                    <div className='resultAction' >
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
        </div>
    )
}
