import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ImagePreviewWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover .delete-icon': {
    opacity: 1,
  },
}));

const DeleteIcon = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 4,
  right: 4,
  background: 'rgba(211, 47, 47, 0.9)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: 28,
  height: 28,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  opacity: 0.7,
  transition: 'opacity 0.2s, transform 0.2s',
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.1)',
    background: 'rgba(211, 47, 47, 1)',
  },
}));

const ImageTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  padding: theme.spacing(0.5),
  fontSize: '0.7rem',
  textAlign: 'center',
}));

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const imageStyle = { width: '100%', height: '100%', objectFit: 'cover' };

const EditPetModal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { petId } = useParams();
  const authToken = localStorage.getItem('token');

  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newFilePreviews, setNewFilePreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const extractImageId = useCallback((imageUrl) => {
    const fileName = imageUrl.split('/').pop();
    return fileName.split('-')[0];
  }, []);

  useEffect(() => {
    if (!authToken) {
      navigate('/not-found');
      return;
    }

    if (petId) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}/pets/${petId}`, {
        headers: { Authorization: authToken }
      })
        .then(response => {
          const pet = response.data;
          setPetName(pet.name);
          setPetType(pet.specie);
          setGender(pet.gender);
          setDescription(pet.description);

          if (pet.images && Array.isArray(pet.images)) {
            const imagesWithIds = pet.images.map(url => ({
              url,
              id: extractImageId(url)
            }));
            setExistingImages(imagesWithIds);
          }

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('Error al cargar los datos de la mascota');
        });
    }
  }, [petId, authToken, navigate, extractImageId]);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const currentImagesCount = existingImages.length - imagesToDelete.length;
    const totalAfterAdd = currentImagesCount + newFiles.length + chosenFiles.length;

    if (totalAfterAdd > 3) {
      setError(`Solo puedes tener un máximo de 3 fotografías. Actualmente tienes ${currentImagesCount} imágenes existentes y ${newFiles.length} nuevas.`);
      return;
    }

    setError('');
    const updatedFiles = [...newFiles, ...chosenFiles];
    setNewFiles(updatedFiles);

    const newPreviews = chosenFiles.map(file => URL.createObjectURL(file));
    setNewFilePreviews([...newFilePreviews, ...newPreviews]);
  };

  const handleDeleteExistingImage = (imageId) => {
    setImagesToDelete([...imagesToDelete, imageId]);
    setError('');
  };

  const handleDeleteNewImage = (index) => {
    URL.revokeObjectURL(newFilePreviews[index]);
    setNewFiles(newFiles.filter((_, i) => i !== index));
    setNewFilePreviews(newFilePreviews.filter((_, i) => i !== index));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description.length < 50 || description.length > 250) {
      setError("La descripción debe tener entre 50 y 250 caracteres.");
      return;
    }

    const finalImageCount = existingImages.length - imagesToDelete.length + newFiles.length;
    if (finalImageCount === 0) {
      setError("La mascota debe tener al menos una fotografía.");
      return;
    }

    if (finalImageCount > 3) {
      setError("La mascota no puede tener más de 3 fotografías.");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append("name", petName);
      formData.append("description", description);
      formData.append("gender", gender);
      formData.append("specie", petType);
      formData.append("status", "active");
      formData.append("createdBy", user.id);

      if (imagesToDelete.length > 0) {
        formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
      }

      newFiles.forEach(file => formData.append("newImages", file));

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/pets/${petId}/complete`,
        formData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setLoading(false);

      if (response.status === 200) {
        setSuccess("¡Mascota actualizada exitosamente!");
        setError('');
        newFilePreviews.forEach(url => URL.revokeObjectURL(url));
        setTimeout(() => navigate('/profile'), 1500);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al actualizar mascota:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al conectar con el servidor. Inténtalo de nuevo.");
      }
    }
  };

  const visibleExistingImages = existingImages.filter(
    img => !imagesToDelete.includes(img.id)
  );

  return (
    <Container maxWidth="sm">
      <FormWrapper>
        <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          EDITAR MASCOTA
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
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
            helperText={`${description.length}/250 caracteres (mínimo 50)`}
          />

          {visibleExistingImages.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Imágenes actuales
              </Typography>
              <ImagePreviewWrapper>
                {visibleExistingImages.map((image) => (
                  <ImagePreview key={image.id}>
                    <img src={image.url} alt="Imagen de mascota" style={imageStyle} />
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => handleDeleteExistingImage(image.id)}
                      type="button"
                    >
                      ×
                    </DeleteIcon>
                    <ImageTag>Actual</ImageTag>
                  </ImagePreview>
                ))}
              </ImagePreviewWrapper>
            </Box>
          )}

          {newFilePreviews.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Nuevas imágenes
              </Typography>
              <ImagePreviewWrapper>
                {newFilePreviews.map((preview, index) => (
                  <ImagePreview key={index}>
                    <img src={preview} alt={`Nueva imagen ${index + 1}`} style={imageStyle} />
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => handleDeleteNewImage(index)}
                      type="button"
                      sx={{ background: 'rgba(123, 31, 162, 0.9) !important' }}
                    >
                      ×
                    </DeleteIcon>
                    <ImageTag>Nueva</ImageTag>
                  </ImagePreview>
                ))}
              </ImagePreviewWrapper>
            </Box>
          )}

          <Button
            variant="contained"
            component="label"
            color="secondary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Agregar más fotos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
            Imágenes actuales: {visibleExistingImages.length} | Nuevas: {newFiles.length} | Total: {visibleExistingImages.length + newFiles.length}/3
          </Typography>

          <ButtonWrapper>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              sx={{
                flex: 1,
                borderColor: 'purple',
                color: 'purple',
                '&:hover': {
                  borderColor: 'darkpurple',
                  color: 'darkpurple',
                },
              }}
              onClick={() => navigate('/profile')}
              disabled={loading}
            >
              Cancelar
            </Button>
          </ButtonWrapper>
        </Box>
      </FormWrapper>
    </Container>
  );
};

export default EditPetModal;
