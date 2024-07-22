import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import logoImage from "../shared/logo-header.png"; // Reemplazar con la ruta de tu logo

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Color de fondo del footer
    padding: theme.spacing(3), // Espaciado interno del footer
    display: "flex", // Usamos flexbox para el posicionamiento
    alignItems: "center", // Alineación vertical al centro
    justifyContent: "center", // Alineación horizontal al centro
    marginTop: "auto",
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
