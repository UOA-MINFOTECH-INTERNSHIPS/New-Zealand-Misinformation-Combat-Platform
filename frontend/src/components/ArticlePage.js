import { Description } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink as RouterNavLink } from 'react-router-dom';
import Article from './Article/articleContainer'


export default function ArticlesPage() {
    return (
        <div>
            <Article/>
        </div>
    );
}