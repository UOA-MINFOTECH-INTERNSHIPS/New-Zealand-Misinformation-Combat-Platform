import React , { useContext,useState, useEffect }from 'react';
import './results.css';
import { Cookies } from 'react-cookie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AppContext from '../../AppContextProvider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function Mission({data}) {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const {user, setUser, loggedIn} = useContext(AppContext); 
    const [page, setPage] = useState(1);
    const [display, setDisplay] = useState([]);
    const [missions, setMissions] = useState([]);

    useEffect(()=>{
        const temp = {username} 
        axios.post("http://localhost:3001/api/user/find", temp).then((res)=> { 
            setUser(res.data);
        })

        axios.get("http://localhost:3001/api/result/all").then((res)=> { 
            setMissions(res.data);
            console.log(res.data);
        })
    },[])

    useEffect(()=>{
        const start = (page-1) * 20; 
        const end = page * 20;
        setDisplay(missions.slice(start,end));
    },[page,data])


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
            console.log(err)
        }
    }

    return (
        <div className='resultContainer'>
            { data.map((val, key)=> (
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
                        {loggedIn &&(user.arrayOfLiked.includes(val._id) ? <FavoriteIcon color="error" />: <FavoriteBorderIcon />)}
                        { loggedIn &&  <i onClick={(e) => {handleLike(val._id)}}><ThumbUpIcon /></i> }
                        <Button variant="text" sx={{backgroundColor: 'rgb(26,38,52)', ml: "auto"}} variant="contained" href= {`/result/${val._id}/read`} size="small"> Read more</Button>
                    </CardActions>
                </Card>
            ) ) } 

        </div>
    )
}
