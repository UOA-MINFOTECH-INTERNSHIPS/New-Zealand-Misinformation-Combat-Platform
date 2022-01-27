import React ,{useState,useEffect}from "react";
import {NavLink, Link} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './UserProfile.css';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from './logo.png';



export default function Profile (){
    const [listOfMission, setListOfMission]=useState([]);
   // const Navigate = useNavigate();
    const cookies = new Cookies();
    const username=cookies.get('username');
    const email=cookies.get('email');
    const userType = cookies.get('userType');
    
   



    return (
        <div className='ProfileCard'>
        <div className='Card'>
            <div className='Upper-container'>
                <div className='image-container'>
                    <img src={logo} alt="picture" height="100px" width="100px" />
                </div>
            </div>
            <div className='lower-container'>
                <h1> Welcome Back, {username}</h1>
                <h2>Email: {email}</h2>
                <h4>UserType: {userType}</h4>
                <button className='button'>
                  <NavLink className='navlink' to='/MissionDisplay'> Visit My Requests</NavLink>
                </button>
                <button className='button'>
                  <NavLink className='navlink' to='/NewMission'>  Create a New Request</NavLink>
                </button>
            </div>
            
        </div>
        </div>
    )
}