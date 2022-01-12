import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PokeBox({ contents }) {
    return (
        <Box>
            <Typography variant="h2" gutterBottom>My Pokémon</Typography>
            <Grid container spacing={2}>
                {contents.map((pokemon) => (
                    <Grid key={pokemon._id} item xs={4} sm={3} md={2}>
                        <Paper>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                <img src={pokemon.imageUrl} />
                            </Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{pokemon.name}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}