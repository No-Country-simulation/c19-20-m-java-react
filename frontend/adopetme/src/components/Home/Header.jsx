import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import logoHeader from "../../../src/components/shared/logo-header.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext"; // IMPORTACIÓN CONTEXTO
import { Paper } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoginOpen, setLoginOpen] = React.useState(false);
  const [isRegisterOpen, setRegisterOpen] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState();
  const navigate = useNavigate();
  const { setSearchTerm, fetchPets, setFilteredPets } = useSearch(); // Obtener funciones del contexto

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (valueSearch) {
      setSearchTerm(valueSearch);
      fetchPets(valueSearch);
      navigate("/publicaciones");
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenLogin = () => {
    setLoginOpen(true);
    handleMenuClose();
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleOpenRegister = () => {
    setRegisterOpen(true);
    handleCloseLogin();
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Mi Perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <Box>
          <MenuItem onClick={handleProfile}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              Mi Perfil
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton
              size="large"
              aria-label="log out"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              Cerrar Sesión
            </Typography>
          </MenuItem>
        </Box>
      ) : (
        <Box>
          <MenuItem onClick={handleOpenRegister}>
            <Button
              variant="outlined"
              sx={{ color: "black", borderColor: "black", width: "100%" }}
            >
              Regístrate
            </Button>
          </MenuItem>
          <MenuItem onClick={handleOpenLogin}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.main",
                color: "primary.main",
                width: "100%",
              }}
            >
              Iniciar Sesión
            </Button>
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            src={logoHeader}
            alt="Logo"
            sx={{
              height: 40,
              cursor: "pointer",
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => navigate("/")}
          />
          <Paper
            elevation={0}
            sx={{ bgcolor: "transparent", p: 0, m: 0 }}
            component="form"
            onSubmit={handleSubmitSearch}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="¿Qué quieres adoptar?"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => {
                  setValueSearch(event.target.value);
                  if (!event.target.value) {
                    setSearchTerm("");
                    setFilteredPets([]);
                  }
                }}
              />
            </Search>
          </Paper>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            {user ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    borderColor: "black",
                    borderWidth: 1,
                    borderStyle: "solid",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                    marginRight: 2,
                  }}
                  onClick={handleOpenRegister}
                >
                  Regístrate
                </Button>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "secondary.main",
                    borderColor: "black",
                    borderWidth: 1,
                    borderStyle: "solid",
                    "&:hover": {
                      backgroundColor: "rgba(236, 64, 122, 0.8)",
                    },
                  }}
                  onClick={handleOpenLogin}
                >
                  Inicia Sesión
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LoginModal
        open={isLoginOpen}
        handleClose={handleCloseLogin}
        handleOpenRegister={handleOpenRegister}
      />
      <RegisterModal open={isRegisterOpen} handleClose={handleCloseRegister} />
    </Box>
  );
}
