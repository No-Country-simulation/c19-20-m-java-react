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

//Icons
import { FaBone } from "react-icons/fa6";
import PlaceIcon from "@mui/icons-material/Place";
import FemaleIcon from "@mui/icons-material/Female";

const CardsPets = ({ id, img, name, gender, ubication, handleClickAdopt }) => {
  const theme = useTheme();

  return (
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

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
            <FemaleIcon fontSize="large" color="primary" sx={{ ml: -0.8 }} />
            <Typography
              sx={{ ml: -0.8 }}
              variant="body1"
              fontWeight="fontWeightBold"
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
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => handleClickAdopt(id)}
        >
          Adoptar
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardsPets;
