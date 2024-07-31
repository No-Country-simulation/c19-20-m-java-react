import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

//Icon
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useNavigate } from "react-router-dom";

const ProfileContact = ({ open, handleClose, id }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfileContact = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users_details/${id}`
      );
      const result = await response.json();
      setProfile(result);
    };

    getProfileContact();
  });

  return (
    <Dialog
      sx={{
        zIndex: 1500,
        "& .MuiDialog-paper": {
          minHeight: 445,
        },
        "& .MuiDialog-container": {
          bgcolor: "transparent",
        },
      }}
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ p: 3, maxWidth: "800px", margin: "auto" }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Información de Contacto
          </Typography>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Nombres
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Apellido1 Apellido2
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Grid container>
              <Grid item xs={3}>
                <Stack spacing={1.5}>
                  <EmailIcon color="primary" />
                  <LocalPhoneIcon color="primary" />
                  <LocationOnIcon color="primary" />
                </Stack>
              </Grid>
              <Grid item xs={9}>
                <Stack spacing={1.5}>
                  <Typography textAlign={"end"} variant="body1">
                    email
                  </Typography>
                  <Typography textAlign={"end"} variant="body1">
                    (+52) 1234567890
                  </Typography>
                  <Typography textAlign={"end"} variant="body1">
                    Guadalajara, México.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            autoFocus
            onClick={() => {
              navigate("/profile");
            }}
            startIcon={<RemoveRedEyeIcon />}
          >
            Ver perfil
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileContact;
