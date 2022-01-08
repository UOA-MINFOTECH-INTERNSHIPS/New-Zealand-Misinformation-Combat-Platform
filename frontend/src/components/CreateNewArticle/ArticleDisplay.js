import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link,useParams } from 'react-router-dom';
import './ArticleDisplay.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip , IconButton, Button} from "@mui/material";


export default function Article_list (){
    const  id  = useParams();
    const [listOfArticle, setListOfArticle]=useState([]);
     
   /* const updateArticle = (id) => {
        const newArticle = prompt("Enter new author");
        axios.put("http://localhost:3001/api/articles/update", {newArticle: newArticle, id:id})
    }*/

    useEffect(()=> {
         axios.get("http://localhost:3001/api/articles/articlelist")
        .then((response) =>{
           setListOfArticle(response.data);
           //  const update = prompt("Enter val: ");
            console.log(response);

        })
        .catch(()=> {
            console.log("ERR")
        })
    },[]);
    

    const Article= {
    author: "Article",
    title: "Title",
    url:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  
    };


    return (

      //  <img style={{width:"200px", height:"200px",borderRadius:"200px"}} src={Article.url} />

         <div>
                     <div>
                             
                           {listOfArticle.map((article)=>{
                               return <div className='UserContainer'>
                                            <div>
                                               {article._id}
                                            </div>
                                             <div>
                                               <Link 
                                               to={`/ArticleDisplay/${article._id}`}
                                               key={article._id}>
                                                   <button>
                                                     Modify
                                                   </button>
                                                   
                                                   </Link>
                                                   <button >
                                                     Delete
                                                   </button>
                                            </div>
                                      </div>
                                     
                              })} 
                              {/* <button 
                           onClick={()=>{
                            updateArticle(val.id)
                           }}
                        ></button> 
                          
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
                </div>*/}
       
       </div> 
       </div>
    );
}