import React ,{useEffect}from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Profile.css';
import { Tooltip , IconButton} from "@mui/material";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Profile (){
    const Navigate = useNavigate();
    const cookies = new Cookies();
    const userDetail=cookies.get('username');
    console.log(userDetail);
   // console.log(cookies.get('username')); 
   Navigate("/NewMission")






    return (
        <div>
                <div className='UserContainer'>
                    <div>
                     </div>
                     <div>
                           <h1>UserName: {userDetail}</h1>
                           
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