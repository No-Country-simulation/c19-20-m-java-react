import React, { useEffect, useState } from "react";

//Material Ui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

//Icons
import PetsIcon from "@mui/icons-material/Pets";
import { FaBone } from "react-icons/fa6";
import PlaceIcon from "@mui/icons-material/Place";
import FemaleIcon from "@mui/icons-material/Female";

const CardsPetsMain = () => {
  const theme = useTheme();
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    const getPets = async () => {
      const response = await fetch("https://dog.ceo/api/breed/hound/images");
      const result = await response.json();
      const resultSlice = result.message.slice(0, 10);
      setPets(resultSlice);
      //console.log("PETS", resultSlice);
    };
    getPets();
  }, []);

  //*****************************************************FUNCTIONS**************************************************************** */
  const handleClickPets = () => {
    console.log("click");
  };

  return (
    <Stack
      spacing={{
        xs: 1,
        sm: 4,
      }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      width="60%"
      mx="auto"
    >
      {pets.length > 0 &&
        pets.map((pet) => {
          return (
            <Card
              key={Math.random()}
              sx={{
                width: 350,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={handleClickPets}
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
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: 350,
                      fontSize: "",
                      borderRadius: "1",
                    }}
                    alt={"pet"}
                    image={pet}
                    title="pet"
                  />

                  <Box
                    sx={{
                      //transform: "rotate(45deg)",
                      // bgcolor: "aquamarine",
                      // width: 100,
                      //height: 0,
                      //margin: "auto",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      // p: 0,
                      // margin: 0,
                      // height: 150,
                    }}
                  >
                    <FaBone fontSize={80} color={theme.palette.primary.main} />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -80%)",
                        // top: 0,
                        // left: 0,
                        // right: 0,
                        // bottom: 0,
                        // margin: "auto",
                      }}
                      mt={1}
                      variant="h6"
                      color="white"
                      textAlign="center"
                      fontWeight="fontWeightBold"
                    >
                      Firulais
                    </Typography>
                  </Box>
                </Box>
                {/* <Stack
                  sx={{ width: 1 }}
                  flexDirection="row"
                  justifyContent={"space-between"}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    alignContent="flex-start"
                    columnGap={2}
                  >
                    <PetsIcon color="primary" />
                    <Typography variant="body1">Edad</Typography>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    alignContent="flex-start"
                    columnGap={2}
                  >
                    <PetsIcon color="primary" />
                    <Typography variant="body1">Raza</Typography>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    alignContent="flex-start"
                    columnGap={2}
                  >
                    <PetsIcon color="primary" />
                    <Typography variant="body1">Genero</Typography>
                  </Stack>
                </Stack> */}
              </Box>

              <CardContent>
                <Stack
                  sx={{ width: 1, mt: 2 }}
                  //flexDirection="row"
                  //sjustifyContent={"space-between"}
                  //justifyContent={"space-between"}
                  alignContent={"space-between"}
                  rowGap={2}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    alignContent="flex-start"
                    columnGap={2}
                  >
                    <PetsIcon color="primary" />
                    <Typography variant="body1" fontWeight="fontWeightBold">
                      Edad
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    alignContent="flex-start"
                    columnGap={2}
                  >
                    <FemaleIcon
                      fontSize="large"
                      color="primary"
                      sx={{ ml: -0.8 }}
                    />
                    <Typography
                      sx={{ ml: -0.8 }}
                      variant="body1"
                      fontWeight="fontWeightBold"
                    >
                      Genero
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
                      Ubicación
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>

              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Descripción
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="justify"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus purus turpis, pellentesque a commodo et, condimentum
                  malesuada magna. Suspendisse sapien lectus
                </Typography>
              </CardContent> */}
            </Card>
          );
        })}
    </Stack>
  );
};

export default CardsPetsMain;
