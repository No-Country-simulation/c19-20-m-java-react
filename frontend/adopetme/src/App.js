import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'; // Ajusta la ruta según tu estructura de carpetas
import UserProfile from './components/User/UserProfile'; // Ajusta la ruta según tu estructura de carpetas

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;



