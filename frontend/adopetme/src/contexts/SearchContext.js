import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPets = async (value) => {
    try {
      setLoading(true);
      // const response = await axios.get(
      //   `https://service01.mercelab.com/pet/search?param=${value}`
      // );

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pet/search?param=${value}`
      );

      setLoading(false);
      setFilteredPets(response.data.data);
    } catch (error) {
      setLoading(false);
      setFilteredPets([]);
      console.error("Error fetching pets:", error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filteredPets,
        fetchPets,
        loading,
        setFilteredPets,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
