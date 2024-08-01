import React from 'react';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logoImage from '../shared/logo-1.png'; 
import bannerImage from '../shared/banner.png'; 

const Banner = styled.div`
    width: 100%; 
    height: 650px; 
    background-image: url(${bannerImage}); 
    background-repeat: no-repeat; 
    background-size: cover; 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    padding: 20px; 
    box-sizing: border-box; 
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7); 
`;

const TextContainer = styled(Box)`
    color: #fff; 
    font-family:"Fira Sans Condensed", sans-serif;
    font-weight: bold;
    
    
`;

const Logo = styled.img`
    width: auto; 
    height: auto;
    margin: 50px;
    margin-left: 10px;
`;

const HomeBanner = () => {
    return (
        <Banner>
            <TextContainer>
                <Typography variant="h3"fontWeight="fontWeightBold">En ADOPETME las mascotas tienen una segunda oportunidad.</Typography>
            </TextContainer>
            <Logo src={logoImage} alt="Logo Adopetme" />
        </Banner>
    );
};

export default HomeBanner;





