import React, { useEffect, useState } from "react";

//Context
import { useSearch } from "../../contexts/SearchContext"; // Importar el contexto

//Material Ui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

//Icons Material Ui
import StorageIcon from "@mui/icons-material/Storage";

//Components
import CardsPets from "./CardsPets";
import ModalAdopt from "./ModalAdopt";
import SkeletonCards from "./SkeletonCards";

//imgs
import NoPhoto from "../../assets/img/nophoto.png";

//Share
import Loading from "../shared/Loading";

const PublicationsPets = () => {
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);

  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();

  const [loading, setLoading] = useState();
  const [loadingImg] = useState();

  const [allPets, setAllPets] = useState();
  const [page, setPage] = React.useState(1);
  const [count, setCount] = useState();
  const [numberItems] = useState(12);

  const { filteredPets, loading: loadingSearch, searchTerm } = useSearch(); // Obtener mascotas filtradas del contexto

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    setLoading(true);

    if (filteredPets.length >= 0 && searchTerm) {
      setLoading(false);
      if (filteredPets.length === 0) {
        pagination(filteredPets);
        setAllPets([]);
      } else {
        pagination(filteredPets);
        setAllPets(filteredPets);
      }
    } else {
      const getPets = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/pet/petimage`
        );
        const result = await response.json();
        setLoading(false);

        //ADD UBICATIONS
        // const newPets = await result.data.map(async (pet) => {
        //   try {
        //     const response = await fetch(
        //       `${process.env.REACT_APP_API_URL}/users_details/${pet?.createdBy}`
        //     );
        //     const result = await response.json();

        //     return {
        //       ...pet,
        //       ubication:
        //         result?.city + ", " + result?.state + ", " + result?.country,
        //     };
        //   } catch (error) {
        //     console.error("Failed to fetch pets:", error);
        //   }
        // });

        // const petWithUbications = await Promise.all(newPets);

        pagination(result.data);
        setAllPets(result.data);
      };
      getPets();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPets]);

  //***************************************************** FUNCTIONS**************************************************************** */

  const handleClickAdopt = (id) => {
    setOpenModalAdopt(true);
    setIdPets(id);
  };

  const handleClodeModalAdopt = () => {
    setOpenModalAdopt(false);
  };

  const handleChangePagination = (event, value) => {
    if (allPets) {
      setPage(value);
      const start = value * numberItems - numberItems;
      const end = value * numberItems;

      const data = allPets.slice(start, end);
      setPets(data);
    }
  };

  const pagination = (array) => {
    const petsLength = array.length;
    const pages = Math.ceil(petsLength / numberItems);
    setCount(pages);

    const data = array.slice(0, numberItems);
    setPets(data);
  };

  return (
    <Box marginY={4}>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{
          color: "white",
          textAlign: "center",
          textTransform: "uppercase",
        }}
        gutterBottom
      >
        Mascotas en adopción
      </Typography>

      <Stack
        spacing={{
          xs: 1,
          sm: 4,
        }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        width="90%"
        mx="auto"
        sx={{ mt: 4 }}
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <SkeletonCards key={index} />
          ))
        ) : pets.length > 0 ? (
          pets.map((pet) => {
            return (
              <CardsPets
                key={pet.id}
                id={pet.id}
                img={pet.images.length > 0 ? pet.images[0].image : NoPhoto}
                name={pet?.name}
                gender={pet?.gender}
                ubication={pet?.ubicacion.country + ", " + pet?.ubicacion.city}
                handleClickAdopt={handleClickAdopt}
                loading={loading}
                loadingImg={loadingImg}
              />
            );
          })
        ) : (
          <Stack alignItems={"center"}>
            <StorageIcon color="secondary" sx={{ fontSize: 100 }} />
            <Typography textAlign={"center"} color={"secondary"} variant="h6">
              Sin resultados
            </Typography>
          </Stack>
        )}
      </Stack>

      {!loading && (
        <Stack alignItems={"center"} mt={4}>
          <Pagination
            count={count}
            page={page}
            //variant="outlined"
            color="secondary"
            onChange={handleChangePagination}
          />
        </Stack>
      )}

      {idPets && (
        <ModalAdopt
          open={openModalAdopt}
          handleCloseModal={handleClodeModalAdopt}
          id={idPets}
        />
      )}

      <Loading open={loadingSearch} />
    </Box>
  );
};

export default PublicationsPets;
