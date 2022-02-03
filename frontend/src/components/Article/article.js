import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './articleStyle.css';


export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const articleID = {"id" : id}; 
    const navigate = useNavigate();
    


    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        })
    }, []);


    return (
        <div>
            
            <div className='returnBtn'>
                <Link to='/articles'><Button variant="outlined"> Back </Button></Link>
            </div>

            <div className='missionDetailContainers'>
                <div className='missionContent'>
                    
                    <div >
                        <h2>{article.title}</h2>
                        <p><strong>Author: </strong>&nbsp;{article.author} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <strong>Published Date:&nbsp;</strong> {article.Published_Date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                        <img className='artiImg' src={article.urlToImage} />
                        
                        {article.content.map((content) => (
                            <p>{content}</p>
                        ))}
                        <Button sx={{backgroundColor: 'rgb(26,38,52)',  mx: 2 }} variant="contained" size="small" href={'/NewMission/' + article._id} > 
                            Verification Request  
                        </Button>

                    </div>


                </div>

            </div>
        </div>
    )
}