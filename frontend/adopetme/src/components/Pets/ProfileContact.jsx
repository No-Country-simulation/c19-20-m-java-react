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
import { Skeleton } from "@mui/material";

const ProfileContact = ({ open, handleClose, id }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfileContact = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/users_details/${id}`
        );
        const result = await response.json();
        setLoading(false);
        setProfile(result.data);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };

    getProfileContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      {loading ? (
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
                <Skeleton variant="circular">
                  <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
                </Skeleton>

                <Skeleton>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Nombres
                  </Typography>
                </Skeleton>

                <Skeleton>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Apellido1 Apellido2
                  </Typography>
                </Skeleton>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Grid container>
                <Grid item xs={3}>
                  <Stack spacing={1.5}>
                    <Skeleton variant="circular" height={30} width={30} />
                    <Skeleton variant="circular" height={30} width={30} />
                    <Skeleton variant="circular" height={30} width={30} />
                  </Stack>
                </Grid>
                <Grid item xs={9}>
                  <Stack spacing={1.5}>
                    <Skeleton variant="text">
                      <Typography textAlign={"end"} variant="body1">
                        correo@dominio.com
                      </Typography>
                    </Skeleton>
                    <Skeleton variant="text">
                      <Typography textAlign={"end"} variant="body1">
                        (+52) 1234567890
                      </Typography>
                    </Skeleton>

                    <Skeleton variant="text">
                      <Typography textAlign={"end"} variant="body1">
                        Guadalajara, México.
                      </Typography>
                    </Skeleton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton height={60}>
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
            </Skeleton>
          </Box>
        </DialogContent>
      ) : (
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
                  {profile?.firstName}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {profile?.lastName}
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
                      {profile?.email}
                    </Typography>
                    <Typography textAlign={"end"} variant="body1">
                      {profile?.phone}
                    </Typography>
                    <Typography textAlign={"end"} variant="body1">
                      {profile?.city +
                        "," +
                        profile?.state +
                        "," +
                        profile?.country}
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
      )}
    </Dialog>
  );
};

export default ProfileContact;
