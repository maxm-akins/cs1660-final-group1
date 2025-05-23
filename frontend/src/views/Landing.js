import React from "react";
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import { useAuth } from "../functions/auth";
import note1 from "../note1.png";

const testimonials = [
    {
        quote: "I never forget an idea now. This is exactly what I needed.",
        author: "– Happy User",
    },
    {
        quote: "Fast, clean, and just works. It’s now part of my daily workflow.",
        author: "– Productive User",
    },
    {
        quote: "It's a game changer for my note-taking. Highly recommend!",
        author: "– This was made up by the devs",
    },
    {
        quote: "Honestly, seems like a silly app made for a class project.",
        author: "– Honest User",
    },
    {
        quote: "I don't think I will ever use a different note-taking app again.",
        author: "– Dishonest User",
    },
    {
        quote: "Pretty sure they are stealing your data. I would not trust this app.",
        author: "– Dave",
    },
];

const Landing = () => {
    const theme = useTheme();
    const { signIn } = useAuth();

    return (
        <Box>
            <Container
                maxWidth="lg"
                sx={ {
                    mt: 8,
                    mb: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "79vh",
                } }
            >
                {/* Headline + CTA */ }
                <Box sx={ { maxWidth: 1200, mb: 2 } }>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={ { fontWeight: 700, mb: 2, lineHeight: 1.2 } }
                    >
                        Organize Your Thoughts Effortlessly
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={ { mb: 4 } }>
                        NoteMaster helps you capture ideas, tasks, and inspirations
                        wherever you are. Clean, simple, and built with the user in mind.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={ {
                            borderRadius: 8,
                            px: 4,
                            py: 1.5,
                            mb: 2,
                            fontSize: "1rem",
                            backgroundColor: "#57a1c2"
                        } }
                        onClick={ signIn }
                    >
                        Get Started
                    </Button>
                </Box>

                {/* Testimonials Section */ }
                <Grid container spacing={ 4 } justifyContent="left">
                    { testimonials.map((t, index) => (
                        <Grid item key={ index } size={ { xs: 12, sm: 6, md: 4 } } >
                            <Card
                                elevation={ 4 }
                                sx={ {
                                    height: "100px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    p: 3,
                                    borderRadius: 3,
                                    "&:hover": {
                                        boxShadow: 6, // or use custom shadow like '0px 4px 20px rgba(0,0,0,0.2)'
                                        transform: "translateY(-4px)",
                                    },
                                } }
                            >
                                <CardContent sx={ { flexGrow: 1 } }>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={ { fontStyle: "italic", mb: 2 } }
                                    >
                                        "{ t.quote }"
                                    </Typography>
                                    <Typography variant="body2" sx={ { fontWeight: 500 } }>
                                        { t.author }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
                <Box
                    sx={ {
                        mt: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.palette.background.default,
                    } }
                >
                    <Box
                        component="img"
                        src={ note1 }
                        alt="Random"
                        sx={ {
                            width: "20%",

                        } }
                    />
                </Box>
            </Container>


        </Box>
    );
};

export default Landing;
