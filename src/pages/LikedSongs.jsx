import React, { useState } from "react";
import "./LikedSongs.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([
    {
      title: "Song 1",
      artist: "Artist 1",
      duration: "3:45",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:10",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      duration: "3:30",
      isLiked: false,
      isHovered: false,
    },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleLike = (index) => {
    const updatedLikedSongs = [...likedSongs];
    updatedLikedSongs[index].isLiked = !updatedLikedSongs[index].isLiked;
    setLikedSongs(updatedLikedSongs);
  };

  const handleHover = (index, isHovered) => {
    const updatedLikedSongs = [...likedSongs];
    updatedLikedSongs[index].isHovered = isHovered;
    setLikedSongs(updatedLikedSongs);
  };

  return (
    <div className="liked-songs-container">
      <header className="app-header">
        <img
          className="app-logo"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Spotify Logo"
        />
        <h1 className="app-title">Liked Songs</h1>
      </header>
      <div className="play-all-icon" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseCircleIcon className="icon-larger" />
        ) : (
          <PlayCircleIcon className="icon-larger" />
        )}
      </div>
      <main className="app-main">
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
                src="URL_TO_SONG_IMAGE"
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
      </main>
    </div>
  );
};

export default LikedSongs;
