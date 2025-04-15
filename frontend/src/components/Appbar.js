import React from "react";
import { Typography, Button, AppBar, Toolbar, } from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useAuth } from "../functions/auth";


const Appbar = () => {
    const { signIn, signOut, user } = useAuth();

    const handleSignIn = () => {
        signIn();
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