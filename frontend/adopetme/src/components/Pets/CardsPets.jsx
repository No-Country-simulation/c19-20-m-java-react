import React from "react";
//Material Ui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import huesito from "../../assets/img/huesito.png";

//Icons
import { FaBone } from "react-icons/fa6";
import PlaceIcon from "@mui/icons-material/Place";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { useNavigate, useLocation } from "react-router-dom";

const CardsPets = ({
  id,
  img,
  name,
  gender,
  ubication,
  handleClickAdopt,
  loading,
  loadingImg,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {loading ? (
        <Card
          sx={{
            width: 350,
          }}
        >
          <Box
            p={2}
            height={400}
            //bgcolor="primary.main"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width={1}>
              <Skeleton animation="wave">
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 350,
                    fontSize: "",
                    borderRadius: "1",
                  }}
                  alt={"pet"}
                  image={img}
                  title="pet"
                />
              </Skeleton>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Skeleton animation="wave" variant="text" height={30}>
                  <FaBone fontSize={80} color={theme.palette.primary.main} />

                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -80%)",
                      textTransform: "capitalize",
                    }}
                    mt={1}
                    variant="h6"
                    color="white"
                    textAlign="center"
                    fontWeight="fontWeightBold"
                  >
                    {name}
                  </Typography>
                </Skeleton>
              </Box>
            </Box>
          </Box>

          <CardContent>
            <Stack
              sx={{ width: 1, mt: 2 }}
              alignContent={"space-between"}
              rowGap={2}
            >
              <Stack
                flexDirection="row"
                alignItems="center"
                alignContent="flex-start"
                columnGap={2}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={20}
                  height={20}
                >
                  {gender === "macho" ? (
                    <MaleIcon
                      fontSize="large"
                      color="primary"
                      sx={{ ml: -0.8 }}
                    />
                  ) : (
                    <FemaleIcon
                      fontSize="large"
                      color="primary"
                      sx={{ ml: -0.8 }}
                    />
                  )}
                </Skeleton>
                <Skeleton animation="wave" variant="text">
                  <Typography
                    sx={{ ml: -0.8 }}
                    variant="body1"
                    fontWeight="fontWeightBold"
                  >
                    {gender}
                  </Typography>
                </Skeleton>
              </Stack>

              <Stack
                flexDirection="row"
                alignItems="center"
                alignContent="flex-start"
                columnGap={2}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={20}
                  height={20}
                >
                  <PlaceIcon color="primary" />
                </Skeleton>
                <Skeleton variant="text">
                  <Typography variant="body1" fontWeight="fontWeightBold">
                    {ubication}
                  </Typography>
                </Skeleton>
              </Stack>
            </Stack>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Skeleton animation="wave" variant="rounded">
              <Button
                variant="contained"
                size="large"
                onClick={() => handleClickAdopt(id)}
              >
                Adoptar
              </Button>
            </Skeleton>
          </CardActions>
        </Card>
      ) : (
        <Card
          sx={{
            width: 350,
            // cursor: "pointer",
            // "&:hover": {
            //   boxShadow: 6,
            // },
          }}
          //  onClick={handleClickPets}
        >
          <Box
            p={2}
            height={400}
            //bgcolor="primary.main"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width={1}>
              {loadingImg ? (
                <Skeleton animation="wave" width={"100%"}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: 350,
                      fontSize: "",
                      borderRadius: "1",
                    }}
                    alt={"pet"}
                    image={img}
                    title="pet"
                  />
                </Skeleton>
              ) : (
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 350,
                    fontSize: "",
                    borderRadius: "1",
                  }}
                  alt={"pet"}
                  image={img}
                  title="pet"
                />
              )}

              <Box
                sx={{
                  //backgroundColor: "aliceblue",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //width: 300,
                  height: 50,
                  //p: 4,
                  mt: 1,
                }}
              >
                <Stack
                  sx={{
                    position: "absolute",
                    //border: 1,
                    width: `${name?.length > 9 ? "35%" : "30%"}`,
                    height: 50,
                    backgroundImage: `url(${huesito})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -85%)",
                      textTransform: "capitalize",
                      fontSize: `${name?.length > 9 ? "1rem" : "1.1rem"}`,
                    }}
                    mt={1}
                    //variant="h6"
                    color="white"
                    textAlign="center"
                    fontWeight="fontWeightBold"
                  >
                    {name}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          <CardContent>
            <Stack
              sx={{ width: 1, mt: 2 }}
              alignContent={"space-between"}
              rowGap={2}
            >
              <Stack
                flexDirection="row"
                alignItems="center"
                alignContent="flex-start"
                columnGap={2}
              >
                {gender === "macho" ? (
                  <MaleIcon
                    fontSize="large"
                    color="primary"
                    sx={{ ml: -0.8 }}
                  />
                ) : (
                  <FemaleIcon
                    fontSize="large"
                    color="primary"
                    sx={{ ml: -0.8 }}
                  />
                )}

                <Typography
                  sx={{ ml: -0.8 }}
                  variant="body1"
                  fontWeight="fontWeightBold"
                  textTransform={"capitalize"}
                >
                  {gender}
                </Typography>
              </Stack>

              <Stack
                flexDirection="row"
                alignItems="center"
                alignContent="flex-start"
                columnGap={2}
              >
                <PlaceIcon color="primary" />
                <Typography variant="body1" fontWeight="fontWeightBold">
                  {ubication}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 2.5,
            }}
          >
            {location.pathname === "/" ||
            location.pathname === "/publicaciones" ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => handleClickAdopt(id)}
              >
                Ver perfil
              </Button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  autoFocus
                  onClick={() => {
                    navigate(`/editor-mascotas-info/${id}`);
                  }}
                >
                  Editar mascota
                </Button>
              </Box>
            )}
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default CardsPets;
