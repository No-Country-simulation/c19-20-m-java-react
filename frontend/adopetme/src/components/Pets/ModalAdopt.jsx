import React, { useEffect, useState } from "react";

//Material UI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

//Material Icons
import PetsIcon from "@mui/icons-material/Pets";
import Divider from "@mui/material/Divider";

import { Carousel } from "react-responsive-carousel";

const ModalAdopt = ({ open, handleCloseModal, id }) => {
  const [singlePets, setSinglePets] = useState();
  const [openZoom, setOpenZoom] = useState(false);

  useEffect(() => {
    const getSinglePets = async () => {
      const response = await fetch("https://dog.ceo/api/breed/hound/images");
      const result = await response.json();
      const resultSlice = result.message.slice(0, 6);

      setSinglePets({
        idPet: 2,
        name: "Fido",
        age: 3,
        longevity: "1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id gravida mauris. ",
        gender: 1,
        size: 30.5,
        weight: 15.2,
        tag: "1, 4, 2",
        createdBy: 100,
        updatedBy: 101,
        idSpecies: 1,
        idBreed: 2,
        img: [resultSlice[0], resultSlice[0], resultSlice[0], resultSlice[0]],
      });
    };

    getSinglePets();
    // if (id) {

    // }
  }, [id]);

  const handleZoom = () => {
    setOpenZoom(true);
  };

  const handleCloseZoom = () => {
    setOpenZoom(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogContent sx={{ py: 6 }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <Carousel>
                  {singlePets?.img.map((pet, index) => (
                    <Box
                      key={index}
                      sx={{ height: 400, cursor: "zoom-in" }}
                      onClick={handleZoom}
                    >
                      <img src={pet} alt="pet" />
                    </Box>
                  ))}
                </Carousel>
              </Box>
            </Grid>

            <Grid item container xs={12} md={6} px={0}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <PetsIcon color="secondary" sx={{ fontSize: 40 }} />
                  <Typography
                    variant="h4"
                    color="secondary"
                    fontWeight="fontWeightBold"
                  >
                    Hola,
                  </Typography>
                  <Typography
                    ml={2}
                    variant="h4"
                    color="primary"
                    fontWeight="fontWeightBold"
                  >
                    soy {singlePets?.name}
                  </Typography>
                </Stack>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mt={12}
                >
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      variant="body"
                      color="primary"
                      fontWeight="fontWeightBold"
                    >
                      {singlePets?.gender === 1 ? "Hembra" : "Macho"}
                    </Typography>
                    <Typography
                      variant="body"
                      color="initial"
                      fontWeight="fontWeightBold"
                      mt={-0.5}
                    >
                      Genero
                    </Typography>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    variant="inset"
                    flexItem
                    sx={{ mx: 2 }}
                  />
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      variant="body"
                      color="primary"
                      fontWeight="fontWeightBold"
                    >
                      {"Perro"}
                    </Typography>
                    <Typography
                      variant="body"
                      color="initial"
                      fontWeight="fontWeightBold"
                      mt={-0.5}
                    >
                      Tipo de mascota
                    </Typography>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                    sx={{ mx: 2 }}
                  />
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      variant="body"
                      color="primary"
                      fontWeight="fontWeightBold"
                    >
                      {"Guadalajara, México"}
                    </Typography>
                    <Typography
                      variant="body"
                      color="initial"
                      fontWeight="fontWeightBold"
                      mt={-0.5}
                    >
                      ubicación
                    </Typography>
                  </Stack>
                </Stack>
                <Box sx={{ mt: 8 }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight="fontWeightBold"
                  >
                    Descripción
                  </Typography>

                  <Typography
                    variant="body1"
                    color="initial"
                    textAlign="justify"
                    mt={2}
                  >
                    {singlePets?.description}
                  </Typography>
                </Box>
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  flexDirection={"column"}
                  //justifyContent={"center"}
                  alignItems={"center"}
                  mt={8}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    fontWeight="fontWeightBold"
                  >{`¿Quieres adoptar a ${singlePets?.name} ?`}</Typography>
                  <Box mt={2}>
                    <Button
                      sx={{ color: "white" }}
                      size="medium"
                      color="primary"
                      variant="contained"
                    >
                      Contacto
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "white" }}
            color="secondary"
            variant="contained"
            onClick={handleCloseModal}
            size="medium"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openZoom}
        onClose={handleCloseZoom}
        aria-labelledby="draggable-dialog-title"
        //fullScreen
        //fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogContent>
          <Box sx={{ width: 1100, height: 900 }}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src={singlePets?.img[0]}
              sx={{ width: "100%", height: "auto" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ModalAdopt;
