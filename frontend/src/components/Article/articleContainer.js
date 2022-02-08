import React, {useState, useEffect, useContext } from 'react';
import './articleStyle.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Grid from '@mui/material/Grid';
import AppContext from '../../AppContextProvider';
import placeholder from '../Image/imagePlaceholder.png'



export default function ArticleContainer (){
    const [listOfArticle, setListOfArticle]=useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1); 
    const {loggedIn} = useContext(AppContext);

    axios.get("http://localhost:3001/api/articles/articleNum").then((res)=> {
        setTotalPage(Math.ceil(res.data/20));
    })


    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/articles/articlelist", pageNum)
       .then((response) =>{
            setListOfArticle(response.data.results);
            console.log(response.data.results)
        })
       .catch(()=> {console.log("ERR") } )
   }, [page]);


    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid >
                    <div className='articlesContainer' >
                    {listOfArticle.map((article)=> (
                        <Card key={article._id} className="articleContainer" sx={{ maxWidth: 730 }}>
                            {article.urlToImage == "null" ? 
                            <CardMedia component="img" alt="green iguana" height="200" image= {placeholder}/>
                            : 
                            <CardMedia component="img" alt="green iguana" height="200" image= {article.urlToImage}/>
                                
                            }
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {article.title}
                                </Typography>

                                {article.author != "null" ?
                                <Typography variant="body2" color="text.secondary">
                                    Author: {article.author}
                                </Typography> : 
                                <Typography variant="body2" color="text.secondary">
                                    Author: Undefined
                                </Typography> }
                                <br/>

                                <Typography variant="body2" color="text.secondary">
                                    {article.background_info}
                                </Typography>
                            </CardContent>
                            
                            <CardActions>
                                {loggedIn && 
                                <Button sx={{backgroundColor: 'rgb(26,38,52)',  mx: 2 }} variant="contained" size="small" href={'/NewMission/' + article._id} > 
                                        Verification Request  
                                </Button>
                                }
                                <Button variant="contained" sx={{backgroundColor: 'rgb(26,38,52)'}} href= {'/articles/' + article._id} size="small"> Read more</Button>
                                
                            </CardActions>
                        </Card>
                        ) ) } 
                    </div>
                    
                    <div className='pagination'>
                        <Pagination className="page" defaultPage={1} count={totalPage} page={page} onChange={handleChange} variant="outlined" />
                    </div>
                    
                    </Grid>
            </Grid>

        </div>
    )
}
