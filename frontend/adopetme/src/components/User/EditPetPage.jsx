import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Estilos para la vista previa de imágenes
const ImagePreviewWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 100,
  height: 100,
  margin: theme.spacing(1),
}));

const DeleteIcon = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: 'rgba(0,0,0,0.6)',
  color: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: theme.spacing(0.5),
}));

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const EditPetModal = ({ open, onClose, petId }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/not-found');
      return;
    }

    if (open) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}/pet/${petId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(response => {
        const pet = response.data;
        setPetName(pet.name);
        setPetType(pet.idSpecies === 1 ? 'Perro' : 'Gato');
        setGender(pet.gender === 0 ? 'Macho' : 'Hembra');
        setDescription(pet.description);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/not-found');
      });
    }
  }, [open, petId, authToken, navigate]);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    if (chosenFiles.length <= 4) {
      setFiles(chosenFiles);
      setPreviews(chosenFiles.map(file => URL.createObjectURL(file)));
    } else {
      setError("Solo puedes subir un máximo de 4 fotografías.");
    }
  };

  const handleRemovePreview = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description.length < 50 || description.length > 250) {
      setError("La descripción debe tener entre 50 y 250 caracteres.");
      return;
    }

    const petFormData = new FormData();
    petFormData.append("name", petName);
    petFormData.append("age", 0);
    petFormData.append("longevity", "");
    petFormData.append("description", description);
    petFormData.append("gender", gender === 'Macho' ? 0 : 1);
    petFormData.append("size", 0);
    petFormData.append("weight", 0);
    petFormData.append("tag", "");
    petFormData.append("createdBy", "");
    petFormData.append("idSpecies", petType === 'Perro' ? 1 : 0);
    petFormData.append("idBreed", 1);

    try {
      setLoading(true);
      
      // Enviar la información de la mascota
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/pet/${petId}`, petFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Actualizar imágenes
      if (files.length > 0) {
        const imageFormData = new FormData();
        files.forEach(file => imageFormData.append("image", file));

        await axios.post(`${process.env.REACT_APP_API_URL}/image/${petId}`, imageFormData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setLoading(false);
      if (response.status === 200) {
        setSuccess("¡Mascota actualizada exitosamente!");
        setError('');
        onClose();
      } else {
        setError("Error al actualizar la mascota. Inténtalo de nuevo.");
      }
    } catch (error) {
      setLoading(false);
      setError("Error al conectar con la base de datos.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <FormWrapper>
        <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          EDITAR MASCOTA
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Nombre de tu mascota"
            variant="outlined"
            margin="normal"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="pet-type-label">Tipo de mascota</InputLabel>
            <Select
              labelId="pet-type-label"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              label="Tipo de mascota"
              required
            >
              <MenuItem value="Perro">Perro</MenuItem>
              <MenuItem value="Gato">Gato</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="gender-label">Género</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Género"
              required
            >
              <MenuItem value="Macho">Macho</MenuItem>
              <MenuItem value="Hembra">Hembra</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Descripción"
            placeholder="Describe a tu mascota..."
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ minLength: 50, maxLength: 250 }}
            required
            helperText="La descripción debe tener entre 50 y 250 caracteres."
          />

          <Button
            variant="contained"
            component="label"
            color="secondary"
            fullWidth
            margin="normal"
          >
            Subir Fotos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
            Puedes subir hasta 4 fotografías.
          </Typography>

          {previews.length > 0 && (
            <ImagePreviewWrapper>
              {previews.map((preview, index) => (
                <ImagePreview key={index}>
                  <img src={preview} alt={`preview-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <DeleteIcon onClick={() => handleRemovePreview(index)}>X</DeleteIcon>
                </ImagePreview>
              ))}
            </ImagePreviewWrapper>
          )}

          <ButtonWrapper sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
            >
              Guardar Cambios
            </Button>

            <Button
              type="button"
              variant="outlined"
              sx={{
                flex: 1,
                ml: 2,
                borderColor: 'purple', // Borde morado
                color: 'purple', // Texto morado
                '&:hover': {
                  borderColor: 'darkpurple', // Borde morado oscuro al pasar el ratón
                  color: 'darkpurple', // Texto morado oscuro al pasar el ratón
                },
              }}
              onClick={onClose}
            >
              Cancelar
            </Button>
          </ButtonWrapper>
        </Box>
      </FormWrapper>

      {loading && <CircularProgress />}
    </Container>
  );
};

export default EditPetModal;
