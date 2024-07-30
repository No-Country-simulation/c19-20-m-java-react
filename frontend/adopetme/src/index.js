// src/index.js
import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme";
//import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  // <Router>
  <React.StrictMode>
    {/* <AuthProvider> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
  // </Router>,
  document.getElementById("root")
);
