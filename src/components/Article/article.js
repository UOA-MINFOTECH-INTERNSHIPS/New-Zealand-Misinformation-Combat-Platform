import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const articleID = {"id" : id};

    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        })
    }, []);


    console.log(article);
    return (
        <div className='ArtiContainer'>
            <Button variant="outlined">Back</Button>
            this is the page for article  {JSON.stringify(id)} 
            
            <div className='singleArticleContainer'>
                <h2>{article.title}</h2>
                <p>{article.author}</p>
                <p>{article.publishAt}</p>
                <img className='singleImg' src={article.urlToImage} />
                <p>{article.content}</p>
            </div>

        </div>
    )
}