// Material UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Icons
// import AddHomeIcon from "@mui/icons-material/AddHome";
// Ser líderes en adopción de animales domésticos, creando un mundo donde cada mascota tenga un hogar amoroso y responsable.

import mision from "../shared/mision.png";
import vision from "../shared/vision.png";

export default function Mision() {
  return (
    <Stack
      //sx={{ padding: 2 }}
      flexDirection={"column"}
      alignItems="center"
      mt={4}
    >
      <Stack sx={{ width: "100%" }} flexDirection={{ xs: "column", md: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            fontWeight="fontWeightBold"
            variant="h3"
            color="white"
            textAlign="center"
          >
            Misión
          </Typography>
          <Stack
            sx={{ width: "100%" }}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            //spacing={2}
          >
            <Typography
              variant="h5"
              color="black"
              textAlign="left"
              sx={{ maxWidth: "300px" }}
            >
              Proveer hogares amorosos y seguros para animales domésticos
              necesitados, promoviendo la adopción responsable y el bienestar
              animal.
            </Typography>
            <Avatar
              alt="Misión"
              src={mision}
              sx={{
                width: { xs: 200, sm: 300, md: 400 },
                height: { xs: 200, sm: 300, md: 400 },
              }}
              variant="square"
            />
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            fontWeight="fontWeightBold"
            variant="h3"
            color="white"
            textAlign="center"
          >
            Visión
          </Typography>
          <Stack
            sx={{ width: "100%" }}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent={"flex-end"}
            // spacing={2}
          >
            <Typography
              variant="h5"
              color="black"
              textAlign="left"
              sx={{ maxWidth: "300px" }}
            >
              Ser líderes en adopción de animales domésticos desde un sitio web
              muy amigable y sencillo de utilizar, creando un mundo donde cada
              mascota tenga un hogar amoroso y responsable.
            </Typography>
            <Avatar
              alt="Visión"
              src={vision}
              sx={{
                width: { xs: 200, sm: 300, md: 400 },
                height: { xs: 200, sm: 300, md: 400 },
                margin: 0,
                p: 0,
              }}
              variant="square"
            />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
