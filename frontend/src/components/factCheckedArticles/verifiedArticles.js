import React, {useState } from 'react';
import Pagination from "@mui/material/Pagination";
import { useNavigate, NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './container.css'

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

export default function FactChecked({data}) {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [page, setPage] = useState(1);
    const classes = useStyles();
      
    const handleChange = (event, value) => {
        setPage(value);
        console.log(page); 
    };

    return(
        <>
            <div>
                {data.map((article)=> (
                    <Grid sx={{ mt:2, mb: 3}}> 
                        <Card sx={{ width: 730 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, mb: 2}} color="red" gutterBottom>
                                    Verification result
                                </Typography>

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <NavLink  to = '/verified/{article._id}' >{article.title}</NavLink>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Like</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ) ) } 

                {/*
                <div className={classes.container}>
                        <Pagination className="page" defaultPage={1} count={10} page={page} onChange={handleChange} color="primary" variant="outlined" classes={{ ul: classes.ul }}/>
                </div>*/}

            </div>
        </>
    )


}