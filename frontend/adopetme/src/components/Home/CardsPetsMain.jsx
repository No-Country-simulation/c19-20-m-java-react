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
import SkeletonCards from "../Pets/SkeletonCards";

//Utils
import converterBase64ToUrl from "../../utils/converterBase64ToUrl";

//Img
import NoPhoto from "../../assets/img/nophoto.png";

const CardsPetsMain = () => {
  const navigate = useNavigate();
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);
  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingImg] = useState(false);

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    setLoading(true);
    const getPets = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/pet/petimage`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setLoading(false);
        const resultSlice = result.data.slice(0, 8);

        const newPets = await resultSlice.map(async (pet) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/users_details/${pet?.createdBy}`
            );
            const result = await response.json();

            return {
              ...pet,
              ubication:
                result?.city + ", " + result?.state + ", " + result?.country,
            };
          } catch (error) {
            console.error("Failed to fetch pets:", error);
          }
        });

        setPets(await Promise.all(newPets));
        console.log(resultSlice);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setLoading(false);
      }
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

  const getUbicationsPets = async (array) => {
    let ubication;
    array.map(async (pet) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users_details/${pet?.createdBy}`
        );
        const result = await response.json();

        const data = {
          createdBy: pet?.createdBy,
          ubication:
            result?.city + ", " + result?.state + ", " + result?.country,
        };
        ubication.push(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    });

    return ubication;
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
        width="80%"
        mx="auto"
        sx={{ mt: 4 }}
      >
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <SkeletonCards key={Math.random()} />
            ))
          : pets.map((pet) => {
              return (
                <CardsPets
                  key={Math.random()}
                  id={pet.idPet}
                  img={
                    pet.image.length > 0
                      ? converterBase64ToUrl(pet.image[0].imagePet)
                      : NoPhoto
                  }
                  name={pet.name}
                  gender={pet?.gender}
                  ubication={pet?.ubication}
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
