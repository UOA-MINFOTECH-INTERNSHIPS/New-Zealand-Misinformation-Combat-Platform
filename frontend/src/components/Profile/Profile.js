import React , {useEffect,useState}from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Profile.css';
import { Tooltip , IconButton} from "@mui/material";



export default function Profile (){
    const user = {
        username: "llia464",
        name: "Linda",
        email: "123@bla.com"
    }

    return (
        <div>
                <div className='UserContainer'>
                    <div>
                         
                     </div>
                     <div>
                           <h1>UserName: {user.username}</h1>
                           <h3>E-mail:</h3>    
                    </div>
                </div>
                <div>
                    
                    <Tooltip title="Add Article">
                        <IconButton size="small" sx={{ ml: 1 }}>
                             <AddCircleIcon style={{width:"60px", height:"60px",borderRadius:"180px", margin:"50px"}} ></AddCircleIcon>
                         </IconButton>
                     </Tooltip>
                </div>
       
       </div>
    );
}