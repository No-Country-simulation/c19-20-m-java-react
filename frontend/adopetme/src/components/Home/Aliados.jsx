// Material UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Icons
// import AddHomeIcon from "@mui/icons-material/AddHome";

import aliado1 from "../shared/aliado1.png";
import aliado2 from "../shared/aliado2.png";
import aliado3 from "../shared/aliado3.png";
import aliado4 from "../shared/aliado4.png";

export default function Aliados() {
  return (
    <Box
      sx={{
        bgcolor: "#8c52ff",
        padding: 2,
      }}
    >
      <Stack
        sx={{ bgcolor: "#8c52ff", padding: 2 }}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography 
          fontWeight="fontWeightBold"
          variant="h3" 
          color="white"
          textAlign="center"
        >
          MARCAS ALIADAS
        </Typography>
      </Stack>
      
      <Stack
        sx={{ bgcolor: "#8c52ff", padding: 2 }}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-around"}
        spacing={2}
      >
        {[aliado1, aliado2, aliado3, aliado4].map((aliado, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", width: "100%", alignItems: "center" }}>
            <Avatar
              alt={`Aliado ${index + 1}`}
              src={aliado}
              sx={{ width: { xs: 200, md: 200 }, height: { xs: 200, md: 200 } }}
              variant="square"

              

            />
            <Typography 
              fontWeight="fontWeightBold" 
              variant="h5" 
              color="white"
              textAlign="center"
              sx={{ marginTop: 1 }}
              // alignItems="flex-end"
            >
              {["HILL'S PET NUTRITION", "PETSMART", "PURINA", "PEDIGREE"][index]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
