import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const CarouselPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPets = async () => {
      const response = await fetch("https://dog.ceo/api/breed/hound/images/random/10");
      const result = await response.json();
      setPets(result.message);
    };
    getPets();
  }, []);

  return (
    <Box width="80%" mx="auto" my={4}>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{ color: "white", textAlign: "center" }}
        gutterBottom
      >
        ¡MASCOTAS QUE YA TINENE UN HOGAR!
      </Typography>
      {pets.length > 0 && (
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          showStatus={false}
        >
          {[...Array(Math.ceil(pets.length / 4))].map((_, i) => (
            <div key={i}>
              <Grid container spacing={2}>
                {pets.slice(i * 4, i * 4 + 4).map((pet, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: 1,
                        overflow: "hidden",
                        p: 1
                      }}
                    >
                      <Box
                        component="img"
                        src={pet}
                        alt={`pet-${index}`}
                        sx={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                        <Typography
                            variant="body2"
                            textAlign="center"
                            mt={1}
                        >
                            Este es Bob, encontro una familia que lo ama y cuida y esta disfrutando su nueva vida.
                        </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default CarouselPets;
