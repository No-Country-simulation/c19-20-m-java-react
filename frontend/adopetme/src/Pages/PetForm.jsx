import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";
import Loading from "../components/shared/Loading";

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const PetForm = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    if (chosenFiles.length <= 4) {
      setFiles(chosenFiles);
    } else {
      setError("Solo puedes subir un máximo de 4 fotografías.");
    }
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  };

  const countWords = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateName(petName)) {
      setError("El nombre solo puede contener letras y espacios.");
      return;
    }

    if (countWords(description) > 500) {
      setError("La descripción no puede exceder 500 palabras.");
      return;
    }

    if (files.length > 4) {
      setError("Solo puedes subir un máximo de 4 fotografías.");
      return;
    }

    // Crear un objeto de datos para enviar
    const formData = new FormData();

    formData.append("name", petName);
    formData.append("age", 0);
    formData.append("longevity", ""); // La longevidad, serial algo parecido, 0 cachorro, 1 joven y 2 anciano
    formData.append("description", description); // Minimo 50 maximo 250 caracteres
    formData.append("gender", gender === "Macho" ? 0 : 1);
    formData.append("size", 0);
    formData.append("weight", 0);
    formData.append("tag", "");
    formData.append("createdBy", "");
    formData.append("idSpecies", petType === "Perro" ? 1 : 0); //number
    formData.append("idBreed", 1);

    //add file to FormData
    files.map((file) => formData.append("image", file));

    try {
      // Simulación de envío de datos a una base de datos
      setLoading(true);
      const response = await fetch(
        "https://service01.mercelab.com/pet/savewithimage",
        {
          method: "POST",
          body: formData,
        }
      );
      setLoading(false);

      if (response.ok) {
        //FETCH PARA GUARDAR IMAGEN
        setSuccess("¡Mascota registrada exitosamente!");
        setError("");
        // Restablecer el formulario después de un registro exitoso
        setPetName("");
        setPetType("");
        setGender("");
        setDescription("");
        setFiles([]);
      } else {
        setError("Error al registrar la mascota. Inténtalo de nuevo.");
      }
    } catch (error) {
      setLoading(false);
      setError("Error al conectar con la base de datos.");
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <FormWrapper>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            REGISTRO DE MASCOTAS
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
              helperText="El nombre solo puede contener letras y espacios."
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
              inputProps={{ maxLength: 500 }}
              required
              helperText="La descripción no puede exceder 500 palabras."
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
                required
              />
            </Button>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, mb: 2 }}
            >
              Puedes subir hasta 4 fotografías.
            </Typography>

            {files.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2">
                  {files.length} archivo(s) seleccionados
                </Typography>
              </Box>
            )}

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Registrar Mascota
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormWrapper>
      </Container>
      <Loading open={loading} />
    </ThemeProvider>
  );
};

export default PetForm;
