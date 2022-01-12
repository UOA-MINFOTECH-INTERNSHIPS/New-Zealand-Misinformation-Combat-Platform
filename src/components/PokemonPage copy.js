import { Fab, LinearProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PageWithNavbar from "./PageWithNavbar";
import PokeBox from "./PokeBox";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

export default function PokemonPage() {

    const { pokemon, catchRandomPokemon, releaseAllPokemon, isLoading } = useContext(AppContext);

    return (
        <PageWithNavbar>
            <PokeBox contents={pokemon} />
            <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                {isLoading && <LinearProgress sx={{ mr: 3, flexGrow: 1 }} />}
                <Fab disabled={isLoading} color="primary" aria-label="add" sx={{ mr: 1 }} onClick={() => catchRandomPokemon()}>
                    <AddIcon />
                </Fab>
                <Fab disabled={isLoading} color="secondary" aria-label="release-all" onClick={() => releaseAllPokemon()}>
                    <DeleteForeverIcon />
                </Fab>
            </Box>
        </PageWithNavbar>
    )
}