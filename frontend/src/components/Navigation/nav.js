import React , {useContext} from 'react';
import './nav.css';
import logo from './luxury.png';
import AppContext from '../../AppContextProvider';
import {Logout} from '@mui/icons-material';
import {Avatar,Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
        getLoggedIn();
        cookies.remove("username")
        cookies.remove("email");
        cookies.remove("userType");
    }

    return (
        <div className='header'>
            <img className='logo' src={logo}/>
            <nav>
                <ul className='nav_links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/articles">News articles</Link></li>
                    <li><Link to="/result">Fact checked</Link></li>
                    <li><Link to="/mission">Fact checked Requests</Link></li>
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
                    <Link className='menu' to='/profile'><MenuItem > Profile </MenuItem></Link>
                    <Link className='menu' to='/liked'><MenuItem sx={{color:"1A2634"}}> Liked List</MenuItem></Link>
                    <Link className='menu' to='/MyMissions'><MenuItem sx={{color:"1A2634"}}> My Requests</MenuItem></Link>
                    {userType == "fact checker" && (<Link className='menu' to='/MyResults'><MenuItem sx={{color:"1A2634"}}>  My Verified List</MenuItem></Link>)}
                    <Divider />
                    <Link className='menu' to='/'><MenuItem onClick={logout}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem></Link>
                </Menu>
            </div>
            )}

            {loggedIn === false && ( 
            <div className='webstatus'>
                <Link to="/signin"><button>  Sign in </button></Link>
                <Link to="/signup"><button> Sign up</button></Link>
            </div>)}
        </div>
    )
}
