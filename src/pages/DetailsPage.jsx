import React, { useState } from "react";
import "./LikedSongs.css";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box } from "@mui/material";

const DetailsPage = () => {
  const [likedSongs, setLikedSongs] = useState([
    {
      image:
        "https://resources.tidal.com/images/58cb2c48/ea88/4ffe/9847/822e0e4017e4/750x750.jpg",
      title: "All Eyez on Me",
      artist: "2PAC",
      date: "1996",
      duration: "3:30",
      lyrics:
        "I bet you got it twisted, you don't know who to trust So many player-hatin' - tryna sound like us Say they ready for the funk, but I don't think they knowin' Straight to the depths of Hell is where them cowards goin' Well, are you still down? Holla when you see me And let these devils be sorry for the day they finally freed me I got a caravan of - every time we ride Hittin' - up when we pass by",
    },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="liked-songs-container">
      {likedSongs.map((item, index) => (
        <header key={index} className="app-header">
          <img className="app-logo" src={item.image} alt="Spotify Logo" />
          <h1 className="app-title">{item.title}</h1>
        </header>
      ))}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div className="play-all-icon" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <PauseCircleIcon className="icon-larger" />
          ) : (
            <PlayCircleIcon className="icon-larger" />
          )}
        </div>
        <div
          style={{
            color: "white",
            marginTop: "40px",
            marginLeft: "15px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Lyrics
        </div>
        {likedSongs.map((item, index) => (
          <span
            style={{
              marginTop: "30px",
              textAlign: "initial",
              marginLeft: "15px",
              color: "white",
              flexWrap: "wrap",
              width: "220px",
              fontSize: "18px",
            }}
            key={index}
          >
            {item.lyrics}
          </span>
        ))}
      </Box>

      {/* <main className="app-main">
        <div className="song-list">
          {likedSongs.map((song, index) => (
            <div
              key={index}
              className="song-item"
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
            >
              <div className="song-number">
                {song.isHovered ? (
                  <PlayArrowIcon fontSize="small" />
                ) : (
                  index + 1
                )}
              </div>    

              <img
                className="song-image"
                src={song.image}
                alt={`${song.title} Cover`}
              />
              <div className="song-details">
                <h2 className="song-title">{song.title}</h2>
                <p className="song-artist">{song.artist}</p>
              </div>
              <div className="song-meta">
                <div
                  className={`song-heart-icon ${song.isLiked ? "liked" : ""}`}
                  onClick={() => handleToggleLike(index)}
                >
                  <FavoriteIcon />
                </div>
                <span className="song-duration">{song.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </main> */}
    </div>
  );
};

export default DetailsPage;
