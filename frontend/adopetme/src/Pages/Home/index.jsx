import React from "react";
import Banner from "../../components/Home/Banner";
import CardsPetsMain from "../../components/Home/CardsPetsMain";
import CarouselPets from "../../components/Home/CarouselPets";
import Mision from "../../components/Home/Mision&Vision";
import Aliados from "../../components/Home/Aliados";
import { Container } from "@mui/material";

const index = () => {
  return (
    <div>
      <Banner />
      <Container maxWidth="xl">
        <Mision />
        <CardsPetsMain />
        <CarouselPets />
        <Aliados />
      </Container>
    </div>
  );
};

export default index;
