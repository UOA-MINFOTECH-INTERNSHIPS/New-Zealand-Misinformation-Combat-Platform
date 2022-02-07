import React ,{ useState, useEffect,useContext }from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import './results.css';
import { Cookies } from 'react-cookie';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import AppContext from '../../AppContextProvider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import parse from "html-react-parser";


export default function ResultsContainer() {
    const cookies = new Cookies();
    const username = cookies.get('username');
    const {user, setUser, loggedIn} = useContext(AppContext); 
    const [page, setPage] = useState(1);
    const [display, setDisplay] = useState([]);
    const [results, setResults] = useState([]);
    const [totalPage, setTotalPage] = useState(1); 
    const start = (page-1) * 20; 
    const end = page * 20;

    useEffect(()=> {
        const temp = {username} 
        axios.post("http://localhost:3001/api/user/find", temp).then((res)=> { 
            setUser(res.data)
        })

        axios.get("http://localhost:3001/api/result/resultNum").then((res)=> {
            setTotalPage(Math.ceil(res.data/20));
        })

        axios.get("http://localhost:3001/api/result/all").then((res)=> {
            setResults(res.data);
            setDisplay(res.data.slice(start,end));
        }).catch(()=> {console.log("ERR") } )
    }, []);


    //pagination
    useEffect(()=>{
        const start = (page-1) * 20; 
        const end = page * 20;
        setDisplay(results.slice(start,end));
    },[])


   //set pagination
    const handleChange = (event, value) => {
        setPage(value);
    };

    //handle search bar 
    const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newFilter = results.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        setDisplay(newFilter);
        if(newFilter.length == 0) {
            setTotalPage(1);
        }else setTotalPage(Math.ceil(newFilter.length/20));
    }

    //handle like and unlike
    const handleLike = (id) => {
        try{
            const obj = {username, id};
            if(user.arrayOfLiked.includes(id)){
                axios.post("http://localhost:3001/api/result/unlike", obj).then((res) =>{
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
        <div className='missions'>
            <div className='mission'>
            <p className='title'> Fact checked results </p>
            
            <div className='missionSearch'>
                <input type='text' placeholder= "Search here ..." onChange={handleSearch} /> 
            </div>

            <div className='missionRadioBtn'>
                <RadioGroup row aria-label="sort" name="row-radio-buttons-group">
                    <FormControlLabel value="popular" control={<Radio />} label="Sort by popularity" />
                    <FormControlLabel value="time" control={<Radio />} label="Sort by time" />
                </RadioGroup>
            </div>

            <div className='resultContainer'>
                { display.map((val, key)=> (
                    <Card key={val._id} sx={{mb:3, p:2}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {val.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Fact checking article Number: {val.url}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
<<<<<<< HEAD
                                {parse(val.backgroundInfo)}
=======
                                {parse(val.analysis)}
>>>>>>> main
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

            
            <div className='pagination'>
                <Pagination className="page" defaultPage={1} count={totalPage} page={page} onChange={handleChange} variant="outlined" />
            </div>
            
            
            </div>
        </div>
    )
}
