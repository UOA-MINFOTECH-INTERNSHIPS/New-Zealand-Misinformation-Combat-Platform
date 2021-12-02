import {handleClick}from 'react';
import {NavLink} from 'react-router-dom';
import './navStyle.css';
import Profile from './ProfileDropdown';
import { IconButton, Avatar} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Navbar (){
    return(
    <div className='NavContainer'>
        <nav>
            <div className ='logo'>
                <p>ARTI</p>
            </div>
            <div>
                <ul>
                    <li><NavLink  to = '/articles' activeClassName='is-active'exact={true}>Articles</NavLink></li>
                    <li><NavLink to = '/recommendation' activeClassName='is-active'>Recommendation</NavLink></li>
                </ul>
            
            </div>
            
            <div className='profile'>
                <Profile/>
            </div>
            
            <p className='username'>Linda</p>
        </nav>

    </div>
    )
}
