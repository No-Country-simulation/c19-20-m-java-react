import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "../Pages/Home/index";
import PublicationsPets from "../components/Pets/PublicationsPets";
import MainLayout from "../Pages/layout/MainLayout";
import AdoptPets from "../components/Pets/AdoptPets";
import PetForm from "../Pages/PetForm";
import UserProfile from "../components/User/UserProfile";
import { SearchProvider } from "../contexts/SearchContext";
import { AuthProvider } from "../contexts/AuthContext";
import NotFoundPage from "../Pages/NotFoundPage";
import EditPetPage from "../components/User/EditPetPage";
import EditPetModal from "../components/User/EditPetModal";
import Profile from "../components/Profile/Profile";

const MainRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/publicaciones" element={<PublicationsPets />} />
              <Route path="/adopcion" element={<AdoptPets />} />
              <Route path="/registro-mascotas" element={<PetForm />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route
                path="/editor-mascotas-info/:petId"
                element={<EditPetModal />}
              />
              <Route path="/editor-mascotas" element={<EditPetPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
};

export default MainRouter;
