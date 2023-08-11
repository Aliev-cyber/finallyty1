import React, { useState } from "react";
import "./style.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Profile = () => {
  return (
    <div className="liked-songs-container">
      <header className="app-header">
        <img
          className="profile-logo"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Spotify Logo"
        />
        <h1 className="app-title">Profile</h1>
      </header>
    </div>
  );
};

export default Profile;
