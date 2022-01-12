import React, {useState, useEffect } from 'react';
import './articleStyle.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import { makeStyles } from '@mui/styles';
import { collapseClasses } from '@mui/material';
import { margin } from '@mui/system';
import Article from './article';
import { useNavigate,NavLink } from 'react-router-dom';



const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
        padding: "20px 20px",
      }
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        marginTop: "50px",
        width:"100%"
    },
  }));


export default function ArticleContainer (){
    const navigate = useNavigate();
    const [listOfArticle, setListOfArticle]=useState([]);
    const [like, setLike] = useState(false);
    const [page, setPage] = useState(1);
    const classes = useStyles();
    

    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/articles/articlelist", pageNum)
       .then((response) =>{
            setListOfArticle(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )
   }, [page]);
      
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page); 
    };

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {listOfArticle.map((article)=> (
                 <Card key={article._id} className="articleContainer" sx={{ maxWidth: 600 }}>
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
                        {/*
                        !like ? <i className="material-icons">favorite_border</i> : 
                        <i className="material-icons" style={ {color:"red", marginRight:"5px"} } >favorite</i> 
                        */} Verification Request  
                    </Button>
                    <Button size="small" ><NavLink to = {'/articles/' + article._id} >Read More </NavLink> </Button>
                 </CardActions>
                 </Card>
                 
            ) ) } 
            <div className={classes.container}>
                    <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" classes={{ ul: classes.ul }}/>
            </div>
        </div>
    )
}
