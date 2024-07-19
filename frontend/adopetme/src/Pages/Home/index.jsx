import React from "react";
import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import CardsPetsMain from "../../components/Home/CardsPetsMain";
import Footer from "../../components/Home/Footer";

//Components
// import Banner from "../../components/Home/Banner";

const index = () => {
  return (
    <div>
      <Header />
      <Banner/>
      <CardsPetsMain />
      <Footer/>
    </div>
  );
};

export default index;
