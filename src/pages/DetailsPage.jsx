import React, { useEffect, useState } from "react";
import "./LikedSongs.css";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box } from "@mui/material";
import { useTracksContext } from "../contexts/TracksContext";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { getOneTrack, oneTrack, clearURL } = useTracksContext();
  const { playTrack } = useTracksContext("");
  const [track, setTrack] = useState({});
  const { id } = useParams();
  useEffect(() => {
    clearURL()
    getOneTrack(id);
  }, [id]);
  useEffect(() => {
    if (oneTrack) {
      setTrack({ ...oneTrack });
      clearURL();
    }
  }, [oneTrack]);
  function handleClick() {
    playTrack(id);
  }
  return (
    <div className="liked-songs-container">
      <header className="app-header">
        <img
          className="app-logo"
          src={track.cover_image}
          alt="Spotify Logo"
        />
        <h1 className="app-title">{track.title}</h1>
      </header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div className="play-all-icon" onClick={handleClick}>
          <PlayCircleIcon className="icon-larger" />
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
        >
          {track.album}
        </span>
      </Box>

      {/* <main className="app-main">
        <div className="song-list">
          {likedSongs.map((song, index) => (
            <div
              key={index}
              className="song-track"
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
