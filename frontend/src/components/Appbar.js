import React from "react";
import { Container, Typography, Button, Box, AppBar, Toolbar, Grid, Paper } from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useState } from "react";
import { useAuth } from "../functions/auth";


const Appbar = () => {
    const { signIn, signOut, user } = useAuth();

    const handleSignIn = () => {
        signIn("Jane Doe");
    };
    const handleSignOut = () => {
        signOut();
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <NoteAltIcon sx={ { mr: 1 } } />
                <Typography variant="h6" sx={ { flexGrow: 1 } }>
                    NoteMaster
                </Typography>
                { user ? (

                    <Button color="inherit" onClick={ handleSignOut }>
                        Sign Out
                    </Button>
                ) : (

                    <Button color="inherit" onClick={ handleSignIn }>
                        Sign In
                    </Button>
                ) }


            </Toolbar>
        </AppBar>
    );


};

export default Appbar;