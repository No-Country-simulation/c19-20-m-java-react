import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const EditPetModal = ({ open, onClose, petId, token }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); 


  useEffect(() => {
    if (open) {
      setLoading(true);
      axios.get(`https://service02.mercelab.com/pets/${petId}`)
        .then(response => {
          const pet = response.data;
          setPetName(pet.name);
          setPetType(pet.idSpecies === 1 ? 'Perro' : 'Gato');
          setGender(pet.gender === 0 ? 'Macho' : 'Hembra');
          setDescription(pet.description);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open, petId]);

  const handleFileChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    if (chosenFiles.length <= 4) {
      setFiles(chosenFiles);
    } else {
      setError("Solo puedes subir un máximo de 4 fotografías.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description.length < 50 || description.length > 250) {
      setError("La descripción debe tener entre 50 y 250 caracteres.");
      return;
    }

    const formData = new FormData();
    formData.append("name", petName);
    formData.append("age", 0);
    formData.append("longevity", ""); // Ajusta según sea necesario
    formData.append("description", description);
    formData.append("gender", gender === 'Macho' ? 0 : 1);
    formData.append("size", 0);
    formData.append("weight", 0);
    formData.append("tag", "");
    formData.append("createdBy", "");
    formData.append("idSpecies", petType === 'Perro' ? 1 : 0);
    formData.append("idBreed", 1); // Ajusta según sea necesario

    files.forEach(file => formData.append("image", file));

    try {
      setLoading(true);
      const response = await axios.put(`https://service02.mercelab.com/pets/${petId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setLoading(false);
      if (response.status === 200) {
        setSuccess("¡Mascota actualizada exitosamente!");
        setError('');
        onClose(); // Cierra el modal en éxito
      } else {
        setError("Error al actualizar la mascota. Inténtalo de nuevo.");
      }
    } catch (error) {
      setLoading(false);
      setError("Error al conectar con la base de datos.");
      console.error(error);
    }
  };

  if (!open) return null;

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
            inputProps={{ minLength: 50, maxLength: 250 }} // Rango de caracteres
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
              required
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Guardar Cambios
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </Box>
      </FormWrapper>

      {loading && <CircularProgress />}
    </Container>
  );
};

export default EditPetModal;

// import React, { useState } from 'react';
// import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography, Box, Container, Paper, Alert, CircularProgress } from '@mui/material';
// import { styled } from '@mui/system';


// const FormWrapper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   marginTop: theme.spacing(4),
//   marginBottom: theme.spacing(4),
// }));

// const EditPetPage = ({ open, onClose }) => {
//   const [petName, setPetName] = useState('');
//   const [petType, setPetType] = useState('');
//   const [gender, setGender] = useState('');
//   const [description, setDescription] = useState('');
//   const [files, setFiles] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     const chosenFiles = Array.from(event.target.files);
//     if (chosenFiles.length <= 4) {
//       setFiles(chosenFiles);
//     } else {
//       setError("Solo puedes subir un máximo de 4 fotografías.");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (description.length < 50 || description.length > 250) {
//       setError("La descripción debe tener entre 50 y 250 caracteres.");
//       return;
//     }

//     // Simulación de éxito
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess("¡Mascota actualizada exitosamente!");
//       setError('');
//       // Puedes agregar lógica para manejar la edición aquí
//     }, 1000);
//   };

//   if (!open) return null;

//   return (
//     <Container maxWidth="sm">
//       <FormWrapper>
//         <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
//           EDITAR MASCOTA
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {success}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Nombre"
//             placeholder="Nombre de tu mascota"
//             variant="outlined"
//             margin="normal"
//             value={petName}
//             onChange={(e) => setPetName(e.target.value)}
//             required
//           />

//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel id="pet-type-label">Tipo de mascota</InputLabel>
//             <Select
//               labelId="pet-type-label"
//               value={petType}
//               onChange={(e) => setPetType(e.target.value)}
//               label="Tipo de mascota"
//               required
//             >
//               <MenuItem value="Perro">Perro</MenuItem>
//               <MenuItem value="Gato">Gato</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel id="gender-label">Género</InputLabel>
//             <Select
//               labelId="gender-label"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               label="Género"
//               required
//             >
//               <MenuItem value="Macho">Macho</MenuItem>
//               <MenuItem value="Hembra">Hembra</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             label="Descripción"
//             placeholder="Describe a tu mascota..."
//             multiline
//             rows={4}
//             variant="outlined"
//             margin="normal"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             inputProps={{ minLength: 50, maxLength: 250 }} // Rango de caracteres
//             required
//             helperText="La descripción debe tener entre 50 y 250 caracteres."
//           />

//           <Button
//             variant="contained"
//             component="label"
//             color="secondary"
//             fullWidth
//             margin="normal"
//           >
//             Subir Fotos
//             <input
//               type="file"
//               hidden
//               multiple
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </Button>

//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
//             Puedes subir hasta 4 fotografías.
//           </Typography>

//           {files.length > 0 && (
//             <Box mt={2}>
//               <Typography variant="body2">
//                 {files.length} archivo(s) seleccionado(s)
//               </Typography>
//             </Box>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Guardar Cambios
//           </Button>

//           <Button
//             type="button"
//             variant="outlined"
//             color="secondary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={onClose}
//           >
//             Cancelar
//           </Button>
//         </Box>
//       </FormWrapper>

//       {loading && <CircularProgress sx={{ mt: 2 }} />}
//     </Container>
//   );
// };

// export default <EditPetModal></EditPetModal>;

