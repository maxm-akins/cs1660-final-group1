import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = ({ children }) => {
    return (
        <Box
            sx={ {
                display: "flex",
                flexDirection: "column",
            } }
        >
            <Box
                component="footer"
                sx={ {
                    backgroundColor: "#f1f1f1",
                    py: 2,
                    textAlign: "center",
                } }
            >
                <Typography variant="body2" >
                    © { new Date().getFullYear() } NoteMaster. All rights reserved.
                </Typography>
            </Box>

        </Box >
    );
};

export default Footer;
