import React ,{useState,useEffect}from "react";
import {NavLink, Link} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './FactCheckerProfile.css';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



export default function FactCheckerProfile (){
    const [listOfMission, setListOfMission]=useState([]);
   // const Navigate = useNavigate();
    const cookies = new Cookies();
    const username=cookies.get('username');
    const email=cookies.get('email');
    const userType = cookies.get('userType');
    
    console.log(username);
  



    return (
        <div>
                <div>
                           
                     <div className='ProfileContainer' >                
                           <h1>Welcome come back!  {username} . Lets start to verify </h1>
                           <br/>
                           <button className='button'>
                              <NavLink className='navlink' to='/MyResults'> Visit My Results</NavLink>
                           </button>
                          </div>
                          <div>
                    
                    
                        
                        
                </div>
                </div>
                
       
       </div>
    );
}