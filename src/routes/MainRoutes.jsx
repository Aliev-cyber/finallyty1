import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LikedSongs from "../pages/LikedSongs";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/liked" element={<LikedSongs />}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};

export default MainRoutes;
