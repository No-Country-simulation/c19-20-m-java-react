import React, { useState } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography, Box, Container, Paper, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

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

const EditPetPage = ({ open, onClose }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    if (chosenFiles.length <= 4) {
      setFiles(chosenFiles);
    } else {
      setError("Solo puedes subir un máximo de 4 fotografías.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (description.length < 50 || description.length > 250) {
      setError("La descripción debe tener entre 50 y 250 caracteres.");
      return;
    }

    // Simulación de éxito
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("¡Mascota actualizada exitosamente!");
      setError('');
      // Puedes agregar lógica para manejar la edición aquí
    }, 1000);
  };

  // if (!open) return null;  // Puedes descomentar esta línea si necesitas que el modal se oculte cuando 'open' es false

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

          {files.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2">
                {files.length} archivo(s) seleccionado(s)
              </Typography>
            </Box>
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

export default EditPetPage;
