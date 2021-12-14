import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './ArticleDisplay.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip , IconButton, Button} from "@mui/material";


export default function Article_list (){
    const [listOfArticle, setListOfArticle]=useState([]);

    useEffect(()=> {
         axios.get("http://localhost:3001/api/articles/..")
        .then((response) =>{
            setListOfArticle(response.data)
        })
        .catch(()=> {
            console.log("ERR")
        })
    },[]);
    

    const Article= {
    author: "Article",
    title: "Title",
    
    url:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  
    }

    return (
        <div>
                <div className='UserContainer'>
                    <div>
                         <img style={{width:"200px", height:"200px",borderRadius:"200px"}} 
                              src={Article.url}
                         />
                     </div>
                     <div>
                           <h1>{Article. author}</h1>
                           <h3>{Article. title}</h3>    
                           {listOfArticle.map((val)=>{
                               <div>
                                   {val.author}
                               </div>
                           })}
                    </div>
                </div>
                
                <div>
                <Link to="/editor">
                    <Tooltip title="Add Article">
                        <IconButton size="small" sx={{ ml: 1 }}>
                             <AddCircleIcon style={{width:"60px", height:"60px",borderRadius:"180px", margin:"50px"}} >
                             </AddCircleIcon>
                         </IconButton>
                     </Tooltip>
                    </Link>
                </div>
       
       </div>
    );
}