import React from "react";

//Material Ui
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PublicationsPets = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" color="initial" textAlign={"center"}>
          Publicaciones mascotas
        </Typography>
      </Paper>
    </Container>
  );
};

export default PublicationsPets;
