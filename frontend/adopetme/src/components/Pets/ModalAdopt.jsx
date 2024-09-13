import React, { useEffect, useState } from "react";

//Material UI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";

//Material Icons
import PetsIcon from "@mui/icons-material/Pets";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Carousel } from "react-responsive-carousel";

//Img
import noPhoto from "../../assets/img/nophoto.png";
import ProfileContact from "./ProfileContact";

const ModalAdopt = ({ open, handleCloseModal, id }) => {
  //*****************************************************USE STATE**************************************************************** */
  const [singlePets, setSinglePets] = useState();
  const [singlePetsImg, setSinglePetsImg] = useState([]);
  const [openZoom, setOpenZoom] = useState(false);
  const [indexImgZoom, setIndexImgZoom] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const [openModalContact, setOpenModalContact] = useState(false);
  const [idContact, setIdContact] = useState(id);

  //*****************************************************USE EFFECT**************************************************************** */

  useEffect(() => {
    const getSinglePets = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pet/${id}`
      );

      const result = await response.json();
      setLoading(false);

      const idUser = result?.data.createdBy;

      let singlePet = result.data;

      setSinglePets(singlePet);
      setSinglePetsImg(singlePet.images);
      setIdContact(idUser);
    };

    getSinglePets();
  }, [id]);

  //*****************************************************FUNCTIONS**************************************************************** */

  const handleZoom = (img) => {
    setIndexImgZoom(img);
    setOpenZoom(true);
  };

  const handleCloseZoom = () => {
    setOpenZoom(false);
  };

  const handleCloseModalContact = () => {
    setOpenModalContact(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        //fullWidth={true}
        maxWidth={"md"}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {loading ? (
          <DialogContent sx={{ py: 6 }}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={"100%"}
                    height={350}
                  />
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-evenly"}
                    mt={2}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={60}
                      height={70}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={60}
                      height={70}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={60}
                      height={70}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={60}
                      height={70}
                    />
                  </Stack>
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
                    <Skeleton animation="wave" variant="text">
                      <Typography
                        ml={2}
                        variant="h4"
                        color="primary"
                        fontWeight="fontWeightBold"
                      >
                        soy {singlePets?.name}
                      </Typography>
                    </Skeleton>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={12}
                  >
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="primary"
                          fontWeight="fontWeightBold"
                        >
                          {singlePets?.gender === 1 ? "Hembra" : "Macho"}
                        </Typography>
                      </Skeleton>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="initial"
                          fontWeight="fontWeightBold"
                          mt={-0.5}
                        >
                          Genero
                        </Typography>
                      </Skeleton>
                    </Stack>
                    <Divider
                      orientation="vertical"
                      variant="inset"
                      flexItem
                      sx={{ mx: 2 }}
                    />
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="primary"
                          fontWeight="fontWeightBold"
                        >
                          {"Perro"}
                        </Typography>
                      </Skeleton>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="initial"
                          fontWeight="fontWeightBold"
                          mt={-0.5}
                        >
                          Tipo de mascota
                        </Typography>
                      </Skeleton>
                    </Stack>
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      flexItem
                      sx={{ mx: 2 }}
                    />
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="primary"
                          fontWeight="fontWeightBold"
                        >
                          {"Guadalajara, México"}
                        </Typography>
                      </Skeleton>
                      <Skeleton animation="wave" variant="text">
                        <Typography
                          variant="body"
                          color="initial"
                          fontWeight="fontWeightBold"
                          mt={-0.5}
                        >
                          ubicación
                        </Typography>
                      </Skeleton>
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 8 }}>
                    <Skeleton animation="wave" variant="text">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight="fontWeightBold"
                      >
                        Descripción
                      </Typography>
                    </Skeleton>
                    <Skeleton animation="wave" variant="text">
                      <Typography
                        variant="body1"
                        color="initial"
                        textAlign="justify"
                        mt={2}
                      >
                        {singlePets?.description}
                      </Typography>
                    </Skeleton>
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
                    <Skeleton animation="wave" variant="text">
                      <Typography
                        variant="body1"
                        color="initial"
                        fontWeight="fontWeightBold"
                      >{`¿Quieres adoptar a ${singlePets?.name} ?`}</Typography>
                    </Skeleton>
                    <Box mt={2}>
                      <Skeleton animation="wave" variant="rounded">
                        <Button
                          sx={{ color: "white" }}
                          size="medium"
                          color="primary"
                          variant="contained"
                        >
                          Contacto
                        </Button>
                      </Skeleton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        ) : (
          <DialogContent sx={{ py: 6 }}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6}>
                {loadingImg ? (
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={"100%"}
                      height={350}
                    />
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-evenly"}
                      mt={2}
                    >
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={60}
                        height={70}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={60}
                        height={70}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={60}
                        height={70}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={60}
                        height={70}
                      />
                    </Stack>
                  </Box>
                ) : (
                  <Box>
                    <Carousel>
                      {singlePetsImg.length > 0 ? (
                        singlePetsImg?.map((img, index) => (
                          <Box
                            key={img.id}
                            sx={{
                              height: 400,
                              cursor: "zoom-in",
                              display: "flex",
                              justifyContent: "center",
                            }}
                            onClick={() => handleZoom(img.image)}
                          >
                            <img
                              src={img.image ? img.image : noPhoto}
                              alt={`pet-${index}`}
                            />
                          </Box>
                        ))
                      ) : (
                        <Box
                          sx={{
                            height: 400,
                          }}
                        >
                          <img src={noPhoto} alt="pet" />
                        </Box>
                      )}
                    </Carousel>
                  </Box>
                )}
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
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column-reverse"}
                    >
                      <Typography
                        variant="body"
                        color="primary"
                        fontWeight="fontWeightBold"
                      >
                        {singlePets?.gender === "hembra" ? "Hembra" : "Macho"}
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
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column-reverse"}
                    >
                      <Typography
                        variant="body"
                        color="primary"
                        fontWeight="fontWeightBold"
                        textTransform={"capitalize"}
                      >
                        {singlePets?.specie.name}
                      </Typography>
                      <Typography
                        variant="body"
                        color="initial"
                        fontWeight="fontWeightBold"
                        mt={-0.5}
                      >
                        Mascota
                      </Typography>
                    </Stack>
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      flexItem
                      sx={{ mx: 2 }}
                    />
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column-reverse"}
                    >
                      <Typography
                        variant="body"
                        color="primary"
                        fontWeight="fontWeightBold"
                      >
                        {singlePets?.ubicacion.country +
                          ", " +
                          singlePets?.ubicacion.city}
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
                        onClick={() => setOpenModalContact(true)}
                        startIcon={<RemoveRedEyeIcon />}
                      >
                        Ver contacto
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>

      {idContact & openModalContact && (
        <ProfileContact
          open={openModalContact}
          handleClose={handleCloseModalContact}
          id={idContact}
        />
      )}

      {indexImgZoom && (
        <Dialog
          open={openZoom}
          onClose={handleCloseZoom}
          aria-labelledby="draggable-dialog-title"
          //fullScreen
          //fullWidth={true}
          maxWidth={"xl"}
        >
          <DialogContent>
            <Box
              sx={{
                width: 1000,
                height: 850,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={indexImgZoom}
                sx={{
                  width: "100%",
                  height: "auto",
                  // display: "flex",
                  // justifyContent: "center",
                  // justifyItems: "center",
                  // alignItems: "center",
                  // objectFit: "cover",
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default ModalAdopt;
