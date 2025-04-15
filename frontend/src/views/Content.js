import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Appbar from "../components/Appbar";

const Content = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddNote = () => {
        if (title.trim() && content.trim()) {
            const newNote = { title, content, id: Date.now() };
            setNotes([newNote, ...notes]);
            setTitle("");
            setContent("");
        }
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <>
            <Appbar />
            <Container maxWidth="md" sx={ { py: 4 } }>
                <Typography variant="h4" gutterBottom>
                    Write a New Note
                </Typography>
                <Paper elevation={ 3 } sx={ { p: 3, mb: 4 } }>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                        sx={ { mb: 2 } }
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={ 4 }
                        value={ content }
                        onChange={ (e) => setContent(e.target.value) }
                        sx={ { mb: 2 } }
                    />
                    <Button variant="contained" onClick={ handleAddNote }>
                        Add Note
                    </Button>
                </Paper>

                <Typography variant="h5" gutterBottom>
                    Your Notes
                </Typography>
                <Grid container spacing={ 2 }>
                    { notes.map((note) => (
                        <Grid item xs={ 12 } sm={ 6 } key={ note.id }>
                            <Paper elevation={ 2 } sx={ { p: 2, position: "relative" } }>
                                <Typography variant="h6">{ note.title }</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    { note.content }
                                </Typography>
                                <IconButton
                                    onClick={ () => handleDeleteNote(note.id) }
                                    sx={ { position: "absolute", top: 8, right: 8 } }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    )) }
                </Grid>
            </Container>
        </>
    );
};

export default Content;
