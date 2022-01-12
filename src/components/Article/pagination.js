import React from 'react';
import Pagination from '@mui/material/Pagination';

import './articleStyle.css';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(theme => ({
    root: {
        position:"fixed",
        bottom:0,
        zIndex:200,
        backgroundColor:"grey",
        padding:"10px 80px",
        color:"white",
        width:"100%"
    },
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"white", 
    }
})) 
export default function PaginationFunc ({ page, setPage} ) {
    
    const classes = useStyle();
    const handleChange =()=> {
        setPage(page);
        console.log(page);
        window.scroll(0,0)
    }
return (
    <div className= {classes.container}>
        <div className='root'>
        <Pagination 
            style={ {
                display: "flex",
                justifyContent:"center",
                color: "white"
            } }
            count={page} 
            variant="outlined" 
            shape="rounded" 
            onChange={(e)=>handleChange(e.target.textContext)} />
        </div>
    </div>
    )
}