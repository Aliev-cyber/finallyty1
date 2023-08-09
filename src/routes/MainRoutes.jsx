import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LikedSongs from "../pages/LikedSongs";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/liked" element={<LikedSongs />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default MainRoutes;
