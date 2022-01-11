import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link,useParams } from 'react-router-dom';
import './ArticleDisplay.css';
//import AddCircleIcon from '@mui/icons-material/AddCircle';
//import { Tooltip , IconButton, Button} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from '@mui/styles';

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
   // const  id  = useParams();
    const [listOfArticle, setListOfArticle]=useState([]);
    const [page, setPage] = useState(1); 
    const classes = useStyles();


    useEffect(()=> {
         const pageNum ={page};
         axios.get("http://localhost:3001/api/articles/articlelist",pageNum)
        .then((response) =>{
           setListOfArticle(response.data.results);
            //console.log(response);
        })
        .catch(()=> {
           console.log("ERR")
        })
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
        console.log(page); 
    };

    const Article= {
    author: "Article",
    title: "Title",
    url:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  
    };


    return (

      //  <img style={{width:"200px", height:"200px",borderRadius:"200px"}} src={Article.url} />

         <div>
                     <div>
                             
                           {listOfArticle.map((article)=>(
                                <div className='UserContainer'>
                                            <div>
                                               {article._id}
                                            </div>
                                             <div>
                                               <Link 
                                               to={'/ArticleDisplay/${article._id}'}
                                               key={article._id}>
                                                   <button>
                                                     Modify
                                                   </button>
                                                   
                                                   </Link>
                                                   <button >
                                                     Delete
                                                   </button>
                                            </div>
                                            <div >
                                                 <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" />
                                             </div>
                                      </div>
                                     
                           ) ) } 
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