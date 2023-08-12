import React from "react";
import "./style.css";
import { useTracksContext } from "../../contexts/TracksContext";
import { useAuthContext } from "../../contexts/AuthContext";

const AddPage = () => {
  const {user} = useAuthContext()
  if (!user.is_staff) {
		return <Navigate to="/" />;
	}
  const { createTrack } = useTracksContext();
  const genres = ["Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical"];
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const response = {
      title: data.get("title"),
      artist: data.get("artist"),
      album: data.get("album"),
      genre: data.get("genre"),
      cover_image: data.get("image"),
      audio_url: data.get("audio"),
      release_year: 2000,
      duration_seconds: 120
    };
    createTrack(response)
    console.log("Successfully added",response);
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
          placeholder="Album"
          name="album"
        />
        <select className="add-input" name="genre">
          <option value="" disabled selected>
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
        <button className="add-input" type="submit">
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddPage;
