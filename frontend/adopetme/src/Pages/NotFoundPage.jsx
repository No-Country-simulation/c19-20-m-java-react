import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Página No Encontrada
      </Typography>
      <Typography variant="body1" paragraph>
        Lo siento, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver a Inicio
      </Button>
    </Container>
  );
};

export default NotFoundPage;
