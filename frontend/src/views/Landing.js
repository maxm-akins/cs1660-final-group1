import { useAuth } from "../functions/auth";
import React from "react";
import { Container, Typography, Button, Box, AppBar, Toolbar, Grid, Paper } from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useState } from "react";
import Appbar from "../components/Appbar";

const Landing = () => {
    const { signIn } = useAuth();

    const handleSignIn = () => {
        signIn("Jane Doe");
    };

    return (
        <Box>

            <Appbar />

            <Container maxWidth="md" sx={ { py: 8 } }>
                <Grid container spacing={ 4 } alignItems="center">
                    <Grid item xs={ 12 } md={ 6 }>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Organize Your Thoughts Effortlessly
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            NoteMaster helps you capture ideas, tasks, and inspirations wherever you are. Clean, simple, and built for speed.
                        </Typography>
                        <Button variant="contained" size="large" sx={ { mt: 2 } }>
                            Get Started
                        </Button>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <Paper elevation={ 3 } sx={ { p: 3, textAlign: "center" } }>
                            <Typography variant="subtitle1" color="text.secondary">
                                "I never forget an idea now. This is exactly what I needed."
                            </Typography>
                            <Typography variant="body2" sx={ { mt: 1 } }>
                                – Happy User
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Box sx={ { py: 4, textAlign: "center", backgroundColor: '#f5f5f5' } }>
                <Typography variant="body2" color="text.secondary">
                    © { new Date().getFullYear() } NoteMaster. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Landing;