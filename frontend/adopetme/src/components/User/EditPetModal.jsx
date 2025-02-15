import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

// Estilos para la vista previa de imágenes
const ImagePreviewWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 100,
  height: 100,
  margin: theme.spacing(1),
}));

const DeleteIcon = styled("span")(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  background: "rgba(0,0,0,0.6)",
  color: "white",
  borderRadius: "50%",
  cursor: "pointer",
  padding: theme.spacing(0.5),
}));

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const EditPetModal = ({ onClose }) => {
  const { user } = useAuth();
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { petId } = useParams();
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (!authToken) {
      navigate("/not-found");
      return;
    }

    // if (open) {
    console.log("Pet ID", petId);
    setLoading(true);
    axios
      .get(`http://localhost:4000/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const pet = response.data;
        setPreviews(pet.images);
        setPetName(pet.name);
        setPetType(pet.idSpecies === 1 ? "Perro" : "Gato");
        setGender(pet.gender);
        setDescription(pet.description);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // }
  }, [petId, authToken, navigate]);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    if (chosenFiles.length <= 4) {
      setFiles(chosenFiles);
      setPreviews(chosenFiles.map((file) => URL.createObjectURL(file)));
    } else {
      setError("Solo puedes subir un máximo de 4 fotografías.");
    }
  };

  const handleRemovePreview = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleUpdateImage = async () => {
    if (files.length <= 0) {
      setSuccess("¡Mascota actualizada exitosamente!");
      setError("");
      onClose();
      setLoading(false);
      return;
    }

    const imageFormData = new FormData();
    files.forEach((file) => imageFormData.append("image", file));

    await axios
      .post(`http://localhost:4000/add_image/${petId}`, imageFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("result img", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description.length < 50 || description.length > 250) {
      setError("La descripción debe tener entre 50 y 250 caracteres.");
      return;
    }

    const petFormData = {
      name: petName,
      description: description,
      gender: gender,
      createdBy: user.id,
      specie: petType,
      status: "active",
    };

    try {
      setLoading(true);
      setError("");

      const requestOptions = {
        headers: {
          Authorization: authToken,
        },
        redirect: "follow",
      };

      const response = await axios.put(
        `http://localhost:4000/pets/${petId}`,
        petFormData,
        requestOptions
      );
      console.log("response", response);
      if (response.status === 200) {
        //await handleUpdateImage();
        setSuccess("¡Mascota actualizada exitosamente!");
        setError("");
        setLoading(false);
        //onClose();
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
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

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, mb: 2 }}
          >
            Puedes subir hasta 4 fotografías.
          </Typography>

          {previews.length > 0 && (
            <ImagePreviewWrapper>
              {previews.map((preview, index) => (
                <ImagePreview key={index}>
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <DeleteIcon onClick={() => handleRemovePreview(index)}>
                    X
                  </DeleteIcon>
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
                borderColor: "purple",
                color: "purple",
                "&:hover": {
                  borderColor: "darkpurple",
                  color: "darkpurple",
                },
              }}
              onClick={() => navigate("/profile")}
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
