import React ,{useState,useEffect}from "react";
import {NavLink, Link} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Profile.css';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export default function Profile (){
    const [listOfMission, setListOfMission]=useState([]);
   // const Navigate = useNavigate();
    const cookies = new Cookies();
    const username=cookies.get('username');
    const email=cookies.get('email');
    const userType = cookies.get('userType');
    
    console.log(username);
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
                <div>
                           
                     <div className='Userprofile' >                
                           <h1>UserName: {username}</h1>
                           <h1>Email: {email}</h1>
                           <h1>UserType: {userType}</h1>
                           <li ><NavLink to="/profile">Home</NavLink></li>
                           <li ><NavLink to="/NewMission">News articles</NavLink></li>
                           
                          </div>
                </div>
                <div>
                    
                    
                        <NavLink to="/NewMission"> <AddCircleIcon  sx={{ margin:10, width: 70, height: 70, }} /> </NavLink>
                        
                </div>
       
       </div>
    );
}