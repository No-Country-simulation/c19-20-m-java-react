import React from "react";

//Material Ui
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AdoptPets = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" color="initial" textAlign={"center"}>
          Adoptar Mascota
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdoptPets;
