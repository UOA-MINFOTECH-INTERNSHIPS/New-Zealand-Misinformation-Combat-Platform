import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';


export default function VerifiedArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
     const [article, setArticle] = useState([]);
    const articleID = {"id" : id};
    
    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        })
    }, []);

    const handleBack = () => {
        navigate('/articles')
    }


    return (
        <div className='verifiedContainer'> 
            <div className='artiBtn'>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
            </div>

            <div className='verifiedContent'>
            
                <div className='singleArticleContainer'>
                    <h2>{article.title}</h2>
                    <p>{article.author}</p>
                    <p>{article.publishAt}</p>
                    <img className='singleImg' src={article.urlToImage} />
                </div>

            </div>
        </div>
    )
}
