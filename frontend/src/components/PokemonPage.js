import { Fab, LinearProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PageWithNavbar from "./PageWithNavbar";
import PokeBox from "./PokeBox";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import Login from "./Login/loginPage";
import RegistrationForm from "./Register/registerForm";
import Profile from "./Profile/Profile";


export default function PokemonPage() {

    
    return (
        <Profile />
    )
}