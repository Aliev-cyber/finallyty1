import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LikedSongs from "../pages/LikedSongs";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";
import AddPage from "../pages/AddPage";
import Profile from "../pages/Profile";
import ActivationPage from "../pages/ActivationPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/liked" element={<LikedSongs />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add" element={<AddPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
			<Route path="/api/account/activate/" element={<ActivationPage />} />

    </Routes>
  );
};

export default MainRoutes;
