import React from "react";
import MainLayouts from "../layout/MainLayouts";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayouts />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default MainRoutes;
