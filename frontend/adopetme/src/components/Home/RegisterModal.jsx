import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  MenuItem,
  IconButton,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Lista de países de América Latina
const countries = [
  { name: 'Argentina', code: 'AR' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Panama', code: 'PA' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Venezuela', code: 'VE' }
];

// Esquema de validación
const validationSchema = yup.object({
  firstname: yup.string().matches(/^[a-zA-Z\s]*$/, 'Nombre no debe contener signos de puntuación').required('Nombre es requerido'),
  username: yup.string().required('Nombre de usuario es requerido'),
  email: yup.string().email('Ingrese un correo válido').required('Correo es requerido'),
  phone: yup.string().matches(/^\+\d{1,3}\d{7,14}$/, 'Teléfono debe ser un número válido con código de país').required('Teléfono es requerido'),
  country: yup.string().required('País es requerido'),
  city: yup.string().required('Ciudad es requerida'),
  password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña es requerida'),
  lastname: yup.string().required('Apellidos son requeridos')
});

const RegisterModal = ({ open, handleClose }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Enviando datos:', values);
    try {
      const response = await axios.post('https://service12.mercelab.com/auth/create', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessageType('success');
      setMessage('Registro exitoso');
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      setMessageType('error');
      setMessage('Error en el registro');
      console.error('Error en el registro:', error.response?.data || error.message);
    }
    setSubmitting(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style(fullScreen)}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography id="register-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Registro
        </Typography>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            password: '',
            rol: 'USER' // Valor por defecto
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Nombre de Usuario"
                fullWidth
                margin="normal"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <Field
                as={TextField}
                name="password"
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                name="firstname"
                label="Nombre"
                fullWidth
                margin="normal"
                error={touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
              />
              <Field
                as={TextField}
                name="lastname"
                label="Apellidos"
                fullWidth
                margin="normal"
                error={touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
              />
              <Field
                as={TextField}
                name="email"
                label="Correo Electrónico"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="phone"
                label="Teléfono"
                fullWidth
                margin="normal"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <Field
                as={TextField}
                select
                name="country"
                label="País"
                fullWidth
                margin="normal"
                onChange={(event) => setFieldValue('country', event.target.value)}
                error={touched.country && !!errors.country}
                helperText={touched.country && errors.country}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                name="city"
                label="Ciudad"
                fullWidth
                margin="normal"
                error={touched.city && !!errors.city}
                helperText={touched.city && errors.city}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
        {message && (
          <Alert severity={messageType} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

const style = (fullScreen) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: fullScreen ? '90%' : 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
});

export default RegisterModal;
