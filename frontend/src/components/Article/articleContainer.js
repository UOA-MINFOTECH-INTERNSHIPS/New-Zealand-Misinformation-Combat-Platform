import React, {useState, useEffect } from 'react';
import './articleStyle.css';
import axios from 'axios';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ArticleContainer (props){
    const [listOfArticle, setListOfArticle]=useState([]);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [currentPage, setCurrentPage] = useState(1);
    //const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(()=> {
        setLoading(true);
        axios.get("http://localhost:3001/api/articles")
       .then((response) =>{
            setListOfArticle(response.data);
            console.log(response.data);
        })
       .catch(()=> {console.log("ERR") } )
       setLoading(false);
   }, []);
      

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {listOfArticle.map((article)=> (
                 <Card className="articleContainer" sx={{ maxWidth: 600 }}>
                 <CardMedia
                   component="img"
                   alt="green iguana"
                   height="200"
                   image= "https://cdn.mos.cms.futurecdn.net/anjnCotPsZAoHmYadNszPB-1200-80.jpg"
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
                    <Button size="small" onClick={()=> setLike(!like)} > 
                        {
                        !like ? <i class="material-icons">favorite_border</i> : 
                        <i class="material-icons" style={ {color:"red", marginRight:"5px"} } >favorite</i> 
                        } Like 
                    </Button>

                    <Button size="small">Read More</Button>
                 </CardActions>
                 </Card>
            ) ) } 
        </div>
    )
}
