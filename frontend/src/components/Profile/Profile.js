import React ,{useState,useEffect}from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Profile.css';
import { Tooltip , IconButton} from "@mui/material";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Profile (){
    const [listOfMission, setListOfMission]=useState([]);
    const Navigate = useNavigate();
    const cookies = new Cookies();
    const userDetail=cookies.get('username');
    const email=cookies.get('email');
    const userType = cookies.get('userType');
    
    
   //Navigate("/NewMission")

   /*useEffect(()=>{
        console.log(userDetail);
        const username = userDetail;
        axios.post("http://localhost:3001/api/user/addToPostList",username )
        .then((response) => {
            setListOfMission(response.data.result)
            console.log(response)
        })
        .catch(() => {console.log("ERR")})
    },[]); */



    return (
        <div>
                <div className='UserContainer'>
                    <div>
                     </div>
                     <div>
                           <h1>UserName: {userDetail}</h1>
                           <h1>Email: {email}</h1>
                           <h1>userType: {userType}</h1>

                           
                    </div>
                    <div>
                        {listOfMission.map((mission)=>(
                            <p>{mission}</p>
                        ))}
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