import React, { useState } from 'react';
import { Box, Typography, Avatar, Grid, TextField, Button, Modal, IconButton, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PetForm from '../../Pages/PetForm'; // Asegúrate de que la ruta sea correcta
import CloseIcon from '@mui/icons-material/Close';

const UserProfile = () => {
  const theme = useTheme();
  const [isPetFormModalOpen, setIsPetFormModalOpen] = useState(false);

  // Datos de usuario de ejemplo (esto eventualmente vendrá del backend)
  const userData = {
    fullName: 'Juan Pérez',
    username: 'juanperez',
    email: 'juan.perez@example.com',
    phone: '+1234567890',
    country: 'Argentina',
    city: 'Buenos Aires',
    description: 'Amante de los animales y voluntario en refugios locales.'
  };

  const handleOpenPetFormModal = () => {
    console.log('Opening PetForm modal');
    setIsPetFormModalOpen(true);
  };

  const handleClosePetFormModal = () => {
    console.log('Closing PetForm modal');
    setIsPetFormModalOpen(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, ...theme.typography.h4, textAlign: 'center' }}>
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
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleOpenPetFormModal}>
            Registrar Mascota
          </Button>
        </Grid>
      </Grid>

      <Modal open={isPetFormModalOpen} onClose={handleClosePetFormModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClosePetFormModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Registrar Mascota
          </Typography>
          <PetForm />
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default UserProfile;


