// src/contexts/SearchContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  const fetchPets = async (query) => {
    try {
      const response = await axios.get('https://service01.mercelab.com/pet', { params: { query } });
      setFilteredPets(response.data.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredPets, fetchPets }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

