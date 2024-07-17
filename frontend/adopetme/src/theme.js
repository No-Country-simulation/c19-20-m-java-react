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
  },
  typography: {
    fontFamily: ["Oxygen", "Fira Sans Condensed", "sans-serif"].join(","),
  },
});

export default theme;
