import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './articleStyle.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import placeholder from '../Image/imagePlaceholder.png'
import Typography from '@mui/material/Typography';


export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const articleID = {"id" : id}; 

    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        })
    });

    return (
        <div className='detailContainter'>

            <div className='returnBtn'>
                <Button variant="outlined" href='/mission'> Back </Button>
            </div>
            <div className='missionDetail'>

            <Card sx={{mb:3, p:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {article.title} 
                    </Typography>
                    <Typography variant="body"  component="div" >
                        Mission request by: {article.author}  <br/>
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Fact Check On: {article.url}
                    </Typography>
                    <Typography variant="body"  component="div">
                        Request Created on: {article.createdAt}
                    </Typography> 
                    {article.urlToImage !== null 
                        ? <CardMedia component="img" alt="green iguana" height="200" image= {article.urlToImage}/> 
                        : null
                    }
                    <Typography variant="body"  component="div">
                        {article.content}
                    </Typography>
                </CardContent>

            </Card>
            </div>
        </div>
    

    )
}