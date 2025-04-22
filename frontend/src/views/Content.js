import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    IconButton,
    Box,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../functions/auth";

const Content = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const theme = useTheme();
    const { user } = useAuth();

    const baseUrl = "https://notes-app-1037276530414.us-central1.run.app";

    const getNotes = useCallback(async () => {
        if (!user) {
            console.error("User is not authenticated");
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/api/notes?user_id=${user.uid}`);
            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }
            const data = await response.json();
            setNotes(data.notes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getNotes();
        }
    }, [user, getNotes]);

    const handleAddNote = async () => {
        if (content.trim()) {
            const noteId = Date.now().toString();
            const userId = user.uid;

            const newNote = {
                note_id: noteId,
                user_id: userId,
                content: content,
            };

            try {
                const response = await fetch(`${baseUrl}/api/notes/create/${noteId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newNote),
                });

                if (!response.ok) {
                    throw new Error("Failed to add note");
                }

                const data = await response.json();
                console.log("Server Response:", data);
                setNotes([newNote, ...notes]);

                await getNotes();
                setContent("");
            } catch (error) {
                console.error("Error adding note:", error);
            }
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (!user) {
            console.error("User is not authenticated");
            return;
        }
        const userId = user.uid;

        try {
            const response = await fetch(
                `${baseUrl}/api/notes/delete/${noteId}?user_id=${user.uid}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: userId }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete note");
            }

            const data = await response.json();
            console.log("Delete response:", data);

            await getNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <>
            <Container
                sx={ {
                    py: { xs: 6, md: 10 },
                    minHeight: "90vh",
                } }>
                <Box textAlign="center" mb={ 6 }>
                    <Typography variant="h3" fontWeight={ 700 } gutterBottom>
                        Create a New Note
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Jot down your ideas, thoughts, and to-dos.
                    </Typography>
                </Box>

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

                <Typography variant="h4" fontWeight={ 600 } gutterBottom>
                    Your Notes { notes.length > 0 ? `(${notes.length})` : "" }
                </Typography>
                <Grid container spacing={ 2 }>
                    { notes.map((note) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 4 } key={ note.note_id }>
                            <Paper
                                elevation={ 4 }
                                sx={ {
                                    p: 2,
                                    minHeight: 180,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: 3,
                                    backgroundColor: "#fff8e1",
                                } }
                            >
                                <Box>

                                    <Typography variant="body2" sx={ { whiteSpace: 'pre-line' } }>
                                        { note.content }
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="flex-end">
                                    <IconButton onClick={ () => handleDeleteNote(note.note_id) }>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                    )) }
                </Grid>


            </Container>
        </>
    );
};

export default Content;