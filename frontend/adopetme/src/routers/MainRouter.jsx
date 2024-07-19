import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Home from "../Pages/Home/index";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
