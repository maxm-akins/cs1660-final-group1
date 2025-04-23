import React from "react";
import { Typography, Button, AppBar, Toolbar, Box } from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useAuth } from "../functions/auth";
import note1 from "../note1.png";


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
            <Toolbar
                sx={ {
                    backgroundColor: "#57a1c2",
                } }>
                <Box
                    component="img"
                    src={ note1 }
                    alt="Random"
                    sx={ {
                        width: "30px",
                        mr: 1,
                    } }
                >
                </Box>
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