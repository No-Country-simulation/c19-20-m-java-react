import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';  // <-- Importar Link de Material-UI

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, handleClose, handleOpenRegister }) => {  // <-- Asegúrate de pasar handleOpenRegister
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes añadir la lógica para manejar el login
    console.log('Email:', email, 'Password:', password);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" fontWeight="fontWeightBold" color = "#6a1e9a" sx={{ mb: 2 }}>
          Iniciar Sesión
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          type="password"
          label="Contraseña"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Iniciar Sesión
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          ¿No tienes una cuenta?{' '}
          <Link component="button" variant="body2" onClick={handleOpenRegister}>  
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginModal;
