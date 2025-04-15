import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    IconButton,
    Box,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Appbar from "../components/Appbar";

const Content = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();

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
            <Container maxWidth="md" sx={ { py: { xs: 6, md: 10 } } }>
                <Box textAlign="center" mb={ 6 }>
                    <Typography variant="h3" fontWeight={ 700 } gutterBottom>
                        Create a New Note
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Jot down your ideas, thoughts, and to-dos.
                    </Typography>
                </Box>

                {/* Note Form */ }
                <Paper
                    elevation={ 4 }
                    sx={ {
                        p: 4,
                        borderRadius: 4,
                        mb: 6,
                        backgroundColor: theme.palette.background.paper,
                    } }
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                        sx={ { mb: 3 } }
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={ 4 }
                        value={ content }
                        onChange={ (e) => setContent(e.target.value) }
                        sx={ { mb: 3 } }
                    />
                    <Button
                        variant="contained"
                        onClick={ handleAddNote }
                        sx={ { px: 4, py: 1.5, borderRadius: 3 } }
                    >
                        Add Note
                    </Button>
                </Paper>

                {/* Notes List */ }
                <Typography variant="h4" fontWeight={ 600 } gutterBottom>
                    Your Notes
                </Typography>

                <Grid container spacing={ 4 } justifyContent="center">
                    { notes.map((note) => (
                        <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ note.id }>
                            <Card
                                elevation={ 3 }
                                sx={ {
                                    height: "100px",
                                    width: "250px",
                                    borderRadius: 3,
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                } }
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={ { fontWeight: 600, mb: 1 } }
                                        gutterBottom
                                    >
                                        { note.title }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        { note.content }
                                    </Typography>
                                </CardContent>

                                <IconButton
                                    onClick={ () => handleDeleteNote(note.id) }
                                    sx={ {
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        color: theme.palette.error.main,
                                    } }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
            </Container>
        </>
    );
};

export default Content;
