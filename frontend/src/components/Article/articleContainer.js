import React, {useState, useEffect } from 'react';
import './articleStyle.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from './pagination';

export default function ArticleContainer (){
    const [listOfArticle, setListOfArticle]=useState([]);
    const [like, setLike] = useState(false);
    const [page, setPage] = useState(1);
    

    useEffect(()=> {
        console.log(page);
        axios.get("http://localhost:3001/api/articles/articlelist", page)
       .then((response) =>{
            
            setListOfArticle(response.results);
            console.log(response.results);
        })
       .catch(()=> {console.log("ERR") } )
   }, [page]);
      

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {listOfArticle.map((article, key)=> (
                 <Card className="articleContainer" sx={{ maxWidth: 600 }}>
                 <CardMedia
                   component="img"
                   alt="green iguana"
                   height="200"
                   image= {article.urlToImage}
                 />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {article.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {article.description}
                    </Typography>

                    <br/>
                    {article.author != null ?
                    <Typography variant="body2" color="text.secondary">
                        Author: {article.author}
                    </Typography> : 
                    <Typography variant="body2" color="text.secondary">
                        Author: Undefined
                    </Typography> }

                    <Typography variant="body2" color="text.secondary">
                        Published Date: {article.publishAt}
                    </Typography>
                 </CardContent>
                 
                 <CardActions>
                    <Button size="small" onClick={()=> setLike(!like)} > 
                        {
                        !like ? <i className="material-icons">favorite_border</i> : 
                        <i className="material-icons" style={ {color:"red", marginRight:"5px"} } >favorite</i> 
                        } Like 
                    </Button>
                    <Button size="small" >Read More</Button>
                 </CardActions>
                 </Card>
            ) ) } 
            <Pagination setPage={setPage} page={page}/>
        </div>
    )
}
