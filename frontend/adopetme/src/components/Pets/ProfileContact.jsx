import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";

//Icon
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import { makeStyles } from "@material-ui/core";

import { SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="right" ref={ref} {...props} />;
// });

const ProfileContact = ({ open, handleClose, id }) => {
  const navigate = useNavigate();
  // const sx: SxProps = {
  //   "& .MuiDialog-container": {
  //     alignItems: "flex-start",
  //   },
  // };
  return (
    <Dialog
      //sx={sx}
      sx={{
        zIndex: 1500,
        "& .MuiDialog-paper": {
          width: "20%",
          minHeight: 445,
        },
        "& .MuiDialog-container": {
          bgcolor: "transparent",
          //flexWrap: "wrap",
          //justifyContent: "flex-end",
          // alignItems: "flex-start",
          //  mr: 11,
        },
      }}
      //PaperProps={{ sx: { mt: "50px" } }}
      open={open}
      //  TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* <DialogTitle
        textAlign={"center"}
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        variant="h5"
      >
        Información de Contacto
      </DialogTitle> */}
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
