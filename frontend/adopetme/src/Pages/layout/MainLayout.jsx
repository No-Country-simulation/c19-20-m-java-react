import React from "react";
import PrimarySearchAppBar from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import Box from "@mui/material/Box";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            mt: "1px",
            // mb: 4,
            position: "relative",
            minHeight: "calc(100vh - 74px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
