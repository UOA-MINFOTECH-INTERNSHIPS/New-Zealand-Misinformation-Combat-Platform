import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContextProvider';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { Cookies } from 'react-cookie';


export default function UserLiked() {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const {user,loggedIn, setUser} = useContext(AppContext);
    const [liked, setLiked] = useState([]);

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

    useEffect(()=> {
        const req = {username};
        axios.post("http://localhost:3001/api/user/user_liked", req)
       .then((res) =>{
            setLiked(res.data);
        })
       .catch(()=> {console.log("ERR") } )
   }, []);


    return (
        <div className='resultContainer'>
            { liked.map((val, key)=> (
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
                        <div className='votes'>
                        <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)',  mx: 2 }} variant="contained" href= {`/result/${val._id}/read`} size="small"> Read more</Button>
                        </div>
                    </div>
                </div>
            ) ) } 

        </div>
    )
}
