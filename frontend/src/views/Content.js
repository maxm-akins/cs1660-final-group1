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
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Appbar from "../components/Appbar";
import { useAuth } from "../functions/auth";

const Content = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const theme = useTheme();
    const { user } = useAuth();

    const getNotes = useCallback(async () => {
        if (!user) {
          console.error("User is not authenticated");
          return;
        }
        try {
          const response = await fetch(`http://localhost:8000/api/notes?user_id=${user.uid}`);
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
        if (title.trim() && content.trim()) {
            const noteId = Date.now().toString();
            const userId = user.uid;
            
            const newNote = {
                note_id: noteId,
                user_id: userId,
                content: content,
            };

            try {
                const response = await fetch(` http://0.0.0.0:8000/api/notes/create/${noteId}`, {
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
                setTitle("");
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
            `http://localhost:8000/api/notes/delete/${noteId}?user_id=${user.uid}`,
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
                        <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ note.note_id }>
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
                                    onClick={ () => handleDeleteNote(note.note_id) }
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
