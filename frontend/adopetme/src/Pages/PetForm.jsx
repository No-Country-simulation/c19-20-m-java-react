import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
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
} from '@mui/material';
import { styled } from '@mui/system';
import theme from '../theme';



const FormWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const PetForm = () => {
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const chosenFiles = Array.from(event.target.files);
        if (chosenFiles.length <= 4) {
            setFiles(chosenFiles);
        } else {
            alert("You can only upload a maximum of 4 files.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <FormWrapper>
                    <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                        REGISTRO DE MASCOTAS
                    </Typography>
                    <Box component="form">
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
                            inputProps={{ maxLength: 200 }}
                            required
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
                        {files.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="body2">
                                    {files.length} archivo(s) seleccionados
                                </Typography>
                            </Box>
                        )}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Registrar Mascota
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </FormWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default PetForm;
