import {handleClick} from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, Box,Tooltip, IconButton, Avatar } from "@mui/material";
import { NavLink as RouterNavLink } from 'react-router-dom';
import Menubar from "./Menubar";
import './navigation.css';
import TabPanel from './tab.js';

export default function Navbar() {
    return (
        <AppBar position="static">
            
            <Toolbar>
                <Button className='menuButton' color="inherit" component={RouterNavLink} to="/">Articles</Button>
                <Menubar/>
            </Toolbar>
            
        </AppBar>
    );
}