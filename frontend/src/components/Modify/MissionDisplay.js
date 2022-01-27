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
import { Cookies } from 'react-cookie';
import {useParams} from 'react-router-dom';
//import ReactDeleteRow from 'react-delete-row';


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
    const Navigate = useNavigate();
    const  findid  = useParams();
    const [listOfArticle, setListOfArticle]=useState([]);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        const pageNum ={page};
        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
        setListOfArticle(response.data.results);
        //console.log(response); 
        const cookies = new Cookies();
        console.log(cookies.get('username')); 
        Navigate("/MissionDisplay")
        })
       .catch(()=> {console.log("ERR") } )
   }, 
   //DELETE request using axios with error handling
   
   [page]);
      
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page); 
    };
   
    const handleClickDelete = (articleId) => {
        const id = {'id':articleId}
        axios.delete("http://localhost:3001/api/mission/delete",{data: id},
        { withCredentials: true })
        .then(window.location.reload());
        console.log(id); 
       
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
                        {article.backgroundInfo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {article.question}
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
                    <Button size="small"  onClick={()=>handleClickDelete(article._id)} > 
                         Delete  
                    </Button>
                    <Link to = {'/MissionDisplay/' + article._id}  > <Button size="small" > Modify  </Button></Link>
                 </CardActions>
                
                 </Card>
                
                 
            ) ) } 
           <div >
                   <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" />
            </div> 
        </div>
    )
}
