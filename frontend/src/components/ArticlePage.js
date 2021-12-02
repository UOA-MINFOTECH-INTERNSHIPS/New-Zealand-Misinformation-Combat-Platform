import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink as RouterNavLink } from 'react-router-dom';
import Navbar from "./Navigation/Navbar";

export default function ArticlesPage() {
    return (
        <div>
            <Navbar/>
            <h1>Articles</h1>
        </div>
    );
}