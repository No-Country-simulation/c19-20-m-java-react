//Material UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//Icosn
import AddHomeIcon from "@mui/icons-material/AddHome";

import logo from "../shared/logo-1.png";

export default function Mision() {
  return (
    <Box
      sx={{
        bgcolor: "cyan",
      }}
    >
      {/* <Box sx={{ bgcolor: "bisque" }}>
        <Typography variant="" color="initial">
          BOX1
        </Typography>
      </Box>
      <Box sx={{ bgcolor: "blueviolet" }}>
        <Typography variant="" color="initial">
          BOX2
        </Typography>
      </Box> */}
      <Stack
        sx={{ bgcolor: "GrayText" }}
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="" color="secondary">
            Mision
          </Typography>
          <Typography variant="" color="white">
            gergekjsoeifj fjaweifpjaweipfjaewip fawijpfjsipajf aipsjfasiofj ip
          </Typography>
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{ width: 200, height: 200 }}
            variant="square"
          />
          <AddHomeIcon color="success" fontSize="300" />
        </Box>

        <Box>
          <Typography variant="" color="initial">
            Vision
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
