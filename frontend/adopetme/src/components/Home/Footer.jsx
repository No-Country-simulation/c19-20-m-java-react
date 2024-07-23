import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import logoImage from "../shared/logo-header.png"; 

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, 
    padding: theme.spacing(3), 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: "auto",
    width: "100%", 
    position: "relative", 
    left: 0, 
    bottom: 0, 
}));

const Logo = styled("img")({
    width: "200px", 
    height: "auto", 
    marginRight: "10px", 
});

const Footer = () => {
    return (
        <FooterContainer>
            <Logo src={logoImage} alt="Logo" />
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontWeight: "bold" }}
            >
                Desarrollado por Code Crafters
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
