import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import MisionVision from './Mision&Vision';
import CardsPetsMain from './CardsPetsMain';
import CarouselPets from './CarouselPets';
import Aliados from './Aliados';
import Banner from './Banner';


// Importa otros componentes según sea necesario

const Home = () => {
  return (
    <div>
        <Header />
        <Banner />
        <LoginModal />
        <RegisterModal />
        <MisionVision />
       <CardsPetsMain />
       <CarouselPets />
         <Aliados />
        <Footer />
    </div>
  );
};

export default Home;
