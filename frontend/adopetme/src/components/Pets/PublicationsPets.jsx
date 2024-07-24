import React, { useEffect, useState } from "react";

//Material Ui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//Material Ui
import Typography from "@mui/material/Typography";
import CardsPets from "./CardsPets";
import ModalAdopt from "./ModalAdopt";

const PublicationsPets = () => {
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);
  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    const getPets = async () => {
      const response = await fetch("https://dog.ceo/api/breed/hound/images");
      const result = await response.json();
      const resultSlice = result.message.slice(0, 20);
      setPets(resultSlice);
    };
    getPets();
  }, []);

  //*****************************************************USE FUNCTIONS**************************************************************** */

  const handleClickAdopt = (id) => {
    setOpenModalAdopt(true);
    setIdPets(id);
  };

  const handleClodeModalAdopt = () => {
    setOpenModalAdopt(false);
  };

  return (
    <Box marginY={4}>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{
          color: "white",
          textAlign: "center",
          textTransform: "uppercase",
        }}
        gutterBottom
      >
        Mascotas en adopción
      </Typography>

      <Stack
        spacing={{
          xs: 1,
          sm: 4,
        }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        width="90%"
        mx="auto"
        sx={{ mt: 4 }}
      >
        {pets.length > 0 &&
          pets.map((pet) => {
            return (
              <CardsPets
                key={Math.random()}
                id={Math.floor(Math.random() * 100)}
                img={pet}
                name="fido"
                gender={"genero"}
                ubication={"ubicacion"}
                handleClickAdopt={handleClickAdopt}
              />
            );
          })}
      </Stack>
      {idPets && (
        <ModalAdopt
          open={openModalAdopt}
          handleCloseModal={handleClodeModalAdopt}
        />
      )}
    </Box>
  );
};

export default PublicationsPets;
