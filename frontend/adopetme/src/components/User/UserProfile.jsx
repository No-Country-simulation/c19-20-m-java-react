import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Avatar, Grid, TextField, Button, Modal, IconButton, Paper, CircularProgress, Alert, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext';
import PetForm from '../../Pages/PetForm';
import EditProfileModal from './EditProfileModal';
import axios from 'axios';
import SkeletonCards from '../Pets/SkeletonCards';
import CardsPets from '../Pets/CardsPets';
import converterBase64ToUrl from '../../utils/converterBase64ToUrl';
import NoPhoto from '../../assets/img/nophoto.png';

const UserProfile = () => {
  const { user, fetchUserDetails } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPetFormModalOpen, setIsPetFormModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [idPets, setIdPets] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.idUserDetails) {
        try {
          const details = await fetchUserDetails(user.idUserDetails);
          setUserDetails(details);

          const response = await axios.get(`${process.env.REACT_APP_API_URL}/pet/petimage`);
          if (response.data && Array.isArray(response.data.data)) {
            const userPets = response.data.data.filter(pet => pet.createdBy === user.idUserDetails);

            const newPets = await Promise.all(userPets.map(async (pet) => {
              try {
                const response = await axios.get(
                  `${process.env.REACT_APP_API_URL}/users_details/${pet.createdBy}`
                );
                const result = response.data;
                return {
                  ...pet,
                  ubication: `${result.city}, ${result.state}, ${result.country}`,
                };
              } catch (error) {
                console.error("Failed to fetch user details:", error);
                return pet;
              }
            }));

            setPets(newPets);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
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

  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleSaveProfile = async (updatedDetails) => {
    try {
      setUserDetails(updatedDetails);
      setMessageType('success');
      setMessage('Perfil actualizado con éxito');
      setIsEditProfileModalOpen(false);
    } catch (error) {
      setMessageType('error');
      setMessage('Error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleClickAdopt = (id) => {
    setIsPetFormModalOpen(true);
    setIdPets(id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Perfil de Usuario
      </Typography>
      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
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
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleOpenEditProfileModal}>
            Editar Perfil
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleOpenPetFormModal}>
            Registrar Mascota
          </Button>
        </Grid>
      </Grid>
      
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Mis Mascotas en Adopción
      </Typography>
      <Stack
        spacing={{
          xs: 1,
          sm: 4,
        }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        width="80%"
        mx="auto"
        sx={{ mt: 4 }}
      >
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <SkeletonCards key={item} />
            ))
          : pets.map((pet) => (
              <CardsPets
                key={pet.idPet}
                id={pet.idPet}
                img={pet.image.length > 0 ? converterBase64ToUrl(pet.image[0].imagePet) : NoPhoto}
                name={pet.name}
                gender={pet?.gender}
                ubication={pet?.ubication}
                handleClickAdopt={handleClickAdopt}
              />
            ))}
      </Stack>

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

      <EditProfileModal
        open={isEditProfileModalOpen}
        handleClose={handleCloseEditProfileModal}
        userDetails={userDetails}
        handleSaveProfile={handleSaveProfile}
      />
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
