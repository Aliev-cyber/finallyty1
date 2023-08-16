import React, { useState } from "react";
import "./style.css";
import { useTracksContext } from "../../contexts/TracksContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const AddPage = () => {
  const { user } = useAuthContext();
  const { createTrack } = useTracksContext();
  const [image, setImage] = useState()
  const navigate = useNavigate()
  if (!user || !user.is_staff) {
    return <Navigate to="/" />;
  }
  const genres = [
    "Charts",
    "Events",
    "At-Home",
    "Eras",
    "Hip-Hop",
    "Wellness",
    "Workout",
    "Relax",
    "Focus",
    "Sleep",
    "Dance",
    "Jazz",
  ];
  function isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$/;
    return youtubeRegex.test(url);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const testImage = new Image();
    testImage.src = data.get("image");
    setImage(testImage.src)
    testImage.onerror = () => {
      setImage("https://gifdb.com/images/high/static-glitch-image-not-found-labitbee4o34s4cs.gif")
    };

    const response = {
      title: data.get("title"),
      artist: data.get("artist"),
      lyrics: data.get("lyrics"),
      genre: data.get("genre"),
      cover_image: image,
      audio_file: isValidYouTubeUrl(data.get("audio"))? data.get("audio"):"https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D",
      release_year: +data.get("release"),
      duration_seconds: +data.get("duration"),
    };
    let isValid = true;
    for (let key in response) {
      console.log(response[key]);
      if (!response[key]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert("fill in the blanks");
      return;
    }
    createTrack(response);
    navigate('/library')
  }
  return (
    <div className="add-page">
      <h1>Add Your Song</h1>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          className="add-input"
          type="text"
          placeholder="Song Title"
          name="title"
        />
        <input
          className="add-input"
          type="text"
          placeholder="Artist"
          name="artist"
        />
        <input
          className="add-input"
          type="text"
          placeholder="Lyrics"
          name="lyrics"
        />
        <select className="add-input" name="genre">
          <option value={null} disabled selected>
            Select Genre
          </option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <input
          className="add-input"
          type="text"
          placeholder="Cover Image URL"
          name="image"
        />
        <input
          className="add-input"
          type="text"
          placeholder="YouTube URL of track"
          name="audio"
        />
        <input
          className="add-input"
          type="number"
          placeholder="Release year"
          name="release"
        />
        <input
          className="add-input"
          type="number"
          placeholder="Duration in seconds"
          name="duration"
        />
        <button className="add-input" type="submit">
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddPage;
