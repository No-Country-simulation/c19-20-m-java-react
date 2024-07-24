import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Material Ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

//Compponent
import CardsPets from "../Pets/CardsPets";
import ModalAdopt from "../Pets/ModalAdopt";

const CardsPetsMain = () => {
  const navigate = useNavigate();
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);
  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    const getPets = async () => {
      const response = await fetch("https://dog.ceo/api/breed/hound/images");
      const result = await response.json();
      const resultSlice = result.message.slice(0, 6);
      setPets(resultSlice);
    };
    getPets();
  }, []);

  //*****************************************************FUNCTIONS**************************************************************** */

  const handleClickAdopt = (id) => {
    setOpenModalAdopt(true);
    setIdPets(id);
  };

  const handleClodeModalAdopt = () => {
    setOpenModalAdopt(false);
  };

  const handleClickSeeMore = () => {
    navigate("/publicaciones");
  };

  return (
    <Box marginY={4}>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{ color: "white", textAlign: "center" }}
        gutterBottom
      >
        NUESTRAS MASCOTAS
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
        width="70%"
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          disableElevation
          sx={{ px: 10, py: 1.5 }}
          onClick={handleClickSeeMore}
        >
          Ver más mascotas
        </Button>
      </Box>

      {idPets && (
        <ModalAdopt
          open={openModalAdopt}
          handleCloseModal={handleClodeModalAdopt}
        />
      )}
    </Box>
  );
};

export default CardsPetsMain;
