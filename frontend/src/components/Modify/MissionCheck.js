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


export default function MissionCheck (){
    const navigate = useNavigate();
    const [listOfMission, setListOfMission]=useState([]);
  //  const [like, setLike] = useState(false);
    const [page, setPage] = useState(1);
    const classes = useStyles();
  

    useEffect(()=> {
        const pageNum ={page};
      //  const userName={user}
        axios.post("http://localhost:3001/api/mission/missionlist", pageNum)
       .then((response) =>{
            setListOfMission(response.data.results);
        })
       .catch(()=> {console.log("ERR") } )
   }, [page]);
      
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page); 
    };

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {listOfMission.map((mission)=> (
                 <Card key={mission._id} className="articleContainer" sx={{ maxWidth: 600 }}>
                 <CardMedia
                   component="img"
                   alt="picture is disappear"
                   height="200"
                   image= {mission.Image}
                 />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div"  >
                        {mission.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: mission.backgroundInfo}}>
                        
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: mission.questions}}>
               
                    </Typography>

                    <br/>
                    {mission.author != null ?
                    <Typography variant="body2" color="text.secondary">
                        Author: {mission.author}
                    </Typography> : 
                    <Typography variant="body2" color="text.secondary">
                        Author: Undefined
                    </Typography> }

                    <Typography variant="body2" color="text.secondary">
                        Published Date: {mission.publishAt}
                    </Typography>
                 </CardContent>
                 
                 <CardActions>
                    
                    <Link to = {'/MissionCheck/' + mission._id}  > <Button size="small" > Verify  </Button></Link>
                 </CardActions>
                 </Card>
                 
            ) ) } 
           <div className={classes.container}>
                    <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" classes={{ ul: classes.ul }}/>
            </div> 
        </div>
    )
}
