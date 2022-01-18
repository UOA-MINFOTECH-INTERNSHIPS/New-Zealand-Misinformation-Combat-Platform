import React , {useContext} from 'react';
import './nav.css';
import logo from './luxury.png';
import AppContext from '../../AppContextProvider';
import UserContext from '../../UserContextProvider';
import {Logout} from '@mui/icons-material';
import {Avatar,Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Button} from '@mui/material';
import axios from 'axios';


export default function Nav() {
    //const {user} = useContext(UserContext);
    const {loggedIn, setLoggedIn, getLoggedIn} = useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    //console.log(user);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };

    async function logout ( ) {
        await axios.get("http://localhost:3001/api/user/logout");
        getLoggedIn();
        console.log(getLoggedIn());
    }

    return (
        <div className='header'>
            <img className='logo' src={logo}/>
            <nav>
                <ul className='nav_links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/articles">News articles</a></li>
                    <li><a href="/result">Fact checked</a></li>
                    <li><a href="/mission">Fact checked Requests</a></li>
                </ul>
            </nav>
            {loggedIn === true && (
            <div className='webstatus'>
                <IconButton  onClick={handleClick} >
                    <Avatar sx={{width: 35, height: 35, }}> l </Avatar>
                    <Typography variant ="h6" color ='white' ml ='10px'> user.username </Typography>
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
                    <MenuItem > <a className='menu' href='/profile'>Profile </a></MenuItem>
                    <MenuItem sx={{color:"1A2634"}}> My articles</MenuItem>
                    <Divider />
                    <MenuItem onClick={logout}>
                        <a className='menu' href='/'>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </a>
                    </MenuItem>
                </Menu>
            </div>
            )}

            {loggedIn === false && ( 
            <div className='webstatus'>
                <a href="/signin"><button>  Sign in </button></a>
                <a href="/signup"><button> Sign up</button></a>
            </div>)}
        </div>
    )
}
