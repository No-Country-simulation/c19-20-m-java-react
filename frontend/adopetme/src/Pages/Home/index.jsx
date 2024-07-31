import React from "react";
import Banner from "../../components/Home/Banner";
import CardsPetsMain from "../../components/Home/CardsPetsMain";
import CarouselPets from "../../components/Home/CarouselPets";
import Mision from "../../components/Home/Mision&Vision";
import Aliados from "../../components/Home/Aliados";

const index = () => {
  return (
    <div>
      <Banner />
      <Mision />
      <CardsPetsMain />
      <CarouselPets />
      <Aliados />
    </div>
  );
};

export default index;
