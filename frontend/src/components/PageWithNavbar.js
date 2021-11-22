import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./Navbar";

export default function PageWithNavbar({ children }) {
    return (
        <>
            <Navbar />
            <Container fixed>
                <Box mt={2}>
                    {children}
                </Box>
            </Container>
        </>
    );
}