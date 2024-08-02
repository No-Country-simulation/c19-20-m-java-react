import React from "react";
//Material Ui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Skeleton from "@mui/material/Skeleton";

//Icons
import { FaBone } from "react-icons/fa6";
import PlaceIcon from "@mui/icons-material/Place";

const SkeletonCards = () => {
  return (
    <Card
      // key={index}
      sx={{
        width: 350,
      }}
    >
      <Box
        p={2}
        height={310}
        //bgcolor="primary.main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width={1}>
          <Skeleton height={300} animation="wave" />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton animation="wave" variant="text" height={30}>
              <FaBone
                fontSize={80}
                // color={theme.palette.primary.main}
              />

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
              ></Typography>
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
            ></Skeleton>
            <Skeleton animation="wave" variant="text">
              <Typography
                sx={{ ml: -0.8 }}
                variant="body1"
                fontWeight="fontWeightBold"
              >
                genero
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
                ubication
              </Typography>
            </Skeleton>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 2,
        }}
      >
        <Skeleton animation="wave" variant="rounded">
          <Button variant="contained" size="large">
            Adoptar
          </Button>
        </Skeleton>
      </CardActions>
    </Card>
  );
};

export default SkeletonCards;
