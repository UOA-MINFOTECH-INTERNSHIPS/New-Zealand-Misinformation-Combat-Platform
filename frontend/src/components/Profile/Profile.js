import React from "react";
import Navbar from "./Navbar_ProfilePage";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
          <Navbar/>
                <div className='UserContainer'>
                    <div>
                         <img style={{width:"200px", height:"200px",borderRadius:"200px"}} 
                              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
                         />
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