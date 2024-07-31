// src/components/User/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Typography, Avatar, Grid, TextField, Button, Paper } from '@mui/material';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Perfil de Usuario
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{userData.fullName}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
            @{userData.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
            {userData.description}
          </Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Información de Contacto
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              value={userData.email}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              value={userData.phone}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="País"
              value={userData.country}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ciudad"
              value={userData.city}
              disabled
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Editar Perfil
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
