import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContextProvider';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { Cookies } from 'react-cookie';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import parse from "html-react-parser";


export default function UserLiked() {
    const cookies = new Cookies();
    const un = cookies.get('username')
    const {user,loggedIn, setUser} = useContext(AppContext);
    const [liked, setLiked] = useState([]);

    const handleLike = (id) => {
        try{
            const obj = {un, id};
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
        const username={"username": un}
        axios.post("http://localhost:3001/api/user/find",username)
        .then((response) =>{
            setUser(response.data);
         })
        .catch(()=> {console.log("ERR") } )


        axios.post("http://localhost:3001/api/user/user_liked",username)
        .then((response) =>{
            setLiked(response.data);
         })
        .catch(()=> {console.log("ERR") } )
    },  
    []);

    return (
        <div className='missions'>
        <div className='mission'>
        <p className='title'> My Liked Fact Check Result List </p>


        <div className='resultContainer'>
            { liked.map((val, key)=> (
                <Card key={val._id} sx={{mb:3, p:2}}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {val.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Fact checking article Number: {val.url}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {parse(val.backgroundInfo)}

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {val.author}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        {loggedIn &&(user.arrayOfLiked.includes(val._id) ? <FavoriteIcon color="error" />: <FavoriteBorderIcon />)}
                        { loggedIn &&  <i onClick={(e) => {handleLike(val._id)}}><ThumbUpIcon /></i> }
                        <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/result/${val._id}/read`} size="small"> Read more</Button>
                    </CardActions>
                </Card>
            ) ) } 

        </div>

        </div>
    </div>
    )
}
