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

//Utils
import converterBase64ToUrl from "../../utils/converterBase64ToUrl";

import NoPhoto from "../../assets/img/nophoto.png";

const CardsPetsMain = () => {
  const navigate = useNavigate();
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);
  const [imgPets, setImgPets] = useState([]);
  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    setLoading(true);
    const getPets = async () => {
      const response = await fetch("https://service01.mercelab.com/pet");
      const result = await response.json();
      setLoading(false);
      const resultSlice = result.data.slice(0, 6);
      setPets(resultSlice);
    };
    getPets();
  }, []);

  useEffect(() => {
    const getPets = async () => {
      setLoadingImg(true);
      const response = await fetch("https://service02.mercelab.com/image");
      const result = await response.json();
      console.log(result);
      setLoadingImg(false);
      const resultSlice = result.data.slice(0, 6);
      setImgPets(resultSlice);
    };
    getPets();
  }, []);

  useEffect(() => {
    if (pets.length > 0 && imgPets.length > 0) {
      const newPets = pets.map((pet) => ({
        ...pet,
        ...imgPets.find((item) => item.idPet === pet.idPet),
      }));

      setPets(newPets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgPets]);

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
                id={pet.idPet}
                img={
                  pet.imagePet ? converterBase64ToUrl(pet.imagePet) : NoPhoto
                }
                name={pet.name}
                gender={pet.gender === 0 ? "Macho" : "Hembra"}
                ubication={"ubicacion"}
                handleClickAdopt={handleClickAdopt}
                loading={loading}
                loadingImg={loadingImg}
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
          id={idPets}
        />
      )}
    </Box>
  );
};

export default CardsPetsMain;
