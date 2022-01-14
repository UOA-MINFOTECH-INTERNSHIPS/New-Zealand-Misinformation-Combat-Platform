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
import { useNavigate,Link } from 'react-router-dom';



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


export default function Mission_list (){
    const navigate = useNavigate();
    const [listOfArticle, setListOfArticle]=useState([]);
  //  const [like, setLike] = useState(false);
    const [page, setPage] = useState(1);
    const classes = useStyles();
    //const [user, setUser] = useState("Linda");
    const user = {
        username: "linda1",
        name: "Linda",
        email: "123@bla.com"
    }

    useEffect(()=> {
        const pageNum ={page};
      //  const userName={user}
        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
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
                    <Button size="small"  > 
                         Delect  
                    </Button>
                    <Link to = {'/ArticleDisplay/' + article._id}  > <Button size="small" >Modify  </Button></Link>
                 </CardActions>
                 </Card>
                 
            ) ) } 
           <div className={classes.container}>
                    <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" classes={{ ul: classes.ul }}/>
            </div> 
        </div>
    )
}
