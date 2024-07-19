import React from "react";
import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import CardsPetsMain from "../../components/Home/CardsPetsMain";
import CarouselPets from "../../components/Home/CarouselPets";
import Footer from "../../components/Home/Footer";
import Mision from "../../components/Home/Mision&Vision";

const index = () => {
  return (
    <div>
      <Header />
      <Banner/>
      <Mision/>
      <CardsPetsMain />
      <CarouselPets />
      <Footer/>
    </div>
  );
};

export default index;
