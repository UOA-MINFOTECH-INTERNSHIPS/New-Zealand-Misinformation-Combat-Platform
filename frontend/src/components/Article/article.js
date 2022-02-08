import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './articleStyle.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const articleID = {"id" : id}; 
    const navigate = useNavigate();

    useEffect(()=> {
        axios.post("http://localhost:3001/api/articles/find", articleID).then((response) =>{
        setArticle(response.data);
        })
    });

    return (
        <div className='detailContainter'>

            <div className='returnBtn'>
                <Button variant="outlined" onClick={(e)=>{navigate(-1)}}> Back </Button>
            </div>
            <div className='missionDetail'>

            <Card sx={{mb:3, p:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {article.title} 
                    </Typography>
                    { article.author !== "null" 
                        ? <Typography variant="body"  component="div" ><strong>Author:</strong> {article.author}  <br/></Typography>
                        : null
                    }
                    {article.urlToImage !== "null" 
                        ? <CardMedia component="img" alt="green iguana" height="500" image= {article.urlToImage}/> 
                        : null
                    }
                    <br/>
                    <Typography variant="body"  component="div">
                        {article.contents}
                    </Typography>
                </CardContent>

            </Card>
            </div>
        </div>
    

    )
}