import React, {useState, useEffect } from 'react';
import './articleStyle.css';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Recommendation (){
    const [listOfArticle, setListOfArticle]=useState([]);

    useEffect(()=> {
        axios.get("http://localhost:3001/api/articles")
       .then((response) =>{
            setListOfArticle(response.data);
            console.log(response.data);
        })
       .catch(()=> {console.log("ERR") } )
   }, []);

    return (
        <div>
        {listOfArticle.map((article)=> (
             <Card className="articleContainer" sx={{ maxWidth: 600 }}>
             <CardMedia
               component="img"
               alt="green iguana"
               height="200"
               image= "https://resources.stuff.co.nz/content/dam/images/4/y/w/b/c/n/image.related.StuffLandscapeSixteenByNine.1420x800.23sewe.png/1639561896996.jpg"
             />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {article.Title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {article.Description}
                </Typography>

                <br/>
                {article.Author != null ?
                <Typography variant="body2" color="text.secondary">
                    Author: {article.Author}
                </Typography> : 
                <Typography variant="body2" color="text.secondary">
                    Author: Undefined
                </Typography> }
                <Typography variant="body2" color="text.secondary">
                    Published Date: {}
                </Typography>
             </CardContent>

             <CardActions>
               <Button size="small"> <FavoriteIcon /> Like </Button>
               <Button size="small">Read More</Button>
             </CardActions>
             </Card>
        ) ) } 
    </div>
    )
}