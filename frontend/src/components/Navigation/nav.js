import React , {useContext} from 'react';
import './nav.css';
import logo from './luxury.png';
import AppContext from '../../AppContextProvider';
import {Logout} from '@mui/icons-material';
import {Avatar,Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Button} from '@mui/material';
import axios from 'axios';
import {NavLink, Link} from 'react-router-dom';
import { Cookies } from 'react-cookie';



export default function Nav() {
    const {loggedIn, getLoggedIn, user, setUser} = useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const cookies = new Cookies();
    const userType = cookies.get('userType');
    const username = cookies.get('username');

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };

    async function logout ( ) {
        await axios.get("http://localhost:3001/api/user/logout");
        localStorage.removeItem('email')
        localStorage.removeItem('userType')
        getLoggedIn();
        setUser({});
    }

    return (
        <div className='header'>
            <img className='logo' src={logo}/>
            <nav>
                <ul className='nav_links'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/articles">News articles</NavLink></li>
                    <li><NavLink to="/result">Fact checked</NavLink></li>
                    <li><NavLink to="/mission">Fact checked Requests</NavLink></li>
                </ul>
            </nav>
            {loggedIn === true && (
            <div className='webstatus'>
                <IconButton  onClick={handleClick} >
                    <Avatar sx={{width: 35, height: 35, }}> {username.charAt(0)} </Avatar>
                    <Typography variant ="h6" color ='white' ml ='10px'> {username} </Typography> 
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
                    PaperProps={{ elevation: 0,
                    sx: {
                        overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                        '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
                        '&:before': {
                            content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, 
                            height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                        }, }, }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem > <Link className='menu' to='/profile'>Profile </Link></MenuItem>
                    <MenuItem sx={{color:"1A2634"}}> <Link className='menu' to='/liked'>Liked List</Link></MenuItem>
                    <MenuItem sx={{color:"1A2634"}}> <NavLink className='menu' to='/MyMissions'>My Requests</NavLink></MenuItem>
                    {userType == "fact checker" && (<MenuItem sx={{color:"1A2634"}}>  <NavLink className='menu' to='/MyResults'>My Verified List</NavLink></MenuItem>)}
                    <Divider />
                    <MenuItem onClick={logout}>
                        <Link className='menu' to='/'>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
            )}

            {loggedIn === false && ( 
            <div className='webstatus'>
                <NavLink to="/signin"><button>  Sign in </button></NavLink>
                <NavLink to="/signup"><button> Sign up</button></NavLink>
            </div>)}
        </div>
    )
}
