import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './articleStyle.css';



export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const articleID = {"id" : id};
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        setContent(article.content) 
        })
    }, []);
    console.log(article)
    console.log(article.content)
 
    const handleBack = () => {
        navigate('/articles')
    }


    return (
        <div className='ArtiContainer'>
        
        <div className='artiBtn'>
            <Button variant="outlined" onClick={handleBack}>Back</Button>
        </div>

        <div className='artiContent'>
            
            <div className='singleArticleContainer'>
                <h2>{article.title}</h2>
                <p>{article.author}</p>
                <p>{article.publishAt}</p>
                <img className='singleImg' src={article.urlToImage} />
                
                {/*content.map((val, key) =>(
                    <p> {val} </p>
                ))*/}
            </div>

        </div>
        </div>
    )
}