import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink as RouterNavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Menubar from "./Menubar";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                
                <Typography variant="h6" component={RouterNavLink} to="/" sx={{ flexGrow: 1, color: "inherit", textDecoration: "inherit" }}>
                 <HomeIcon style={{width:"40px", height:"40px",borderRadius:"40px"}} to="/"></HomeIcon>  
                </Typography>
                <Menubar />
            </Toolbar>
        </AppBar>
    );
}