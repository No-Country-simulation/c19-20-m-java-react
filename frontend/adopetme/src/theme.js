import { purple, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: pink[200],
    },
    background: {
      default: "#8c52ff",
    },
  },
  typography: {
    fontFamily: ["Oxygen", "Fira Sans Condensed", "sans-serif"].join(","),
    button: {
      fontWeight: 700,
    },
  },
});

export default theme;
