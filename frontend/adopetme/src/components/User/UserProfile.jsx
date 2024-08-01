import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Grid, TextField, Button, Modal, IconButton, Paper, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext';
import PetForm from '../../Pages/PetForm';

const UserProfile = () => {
  const { user, fetchUserDetails } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPetFormModalOpen, setIsPetFormModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const details = await fetchUserDetails(user.id);
          setUserDetails(details);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, fetchUserDetails]);

  const handleOpenPetFormModal = () => {
    setIsPetFormModalOpen(true);
  };

  const handleClosePetFormModal = () => {
    setIsPetFormModalOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Perfil de Usuario
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{userDetails?.fullName}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
            @{userDetails?.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
            {userDetails?.description}
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
              value={userDetails?.email || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              value={userDetails?.phone || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="País"
              value={userDetails?.country || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ciudad"
              value={userDetails?.city || ''}
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
