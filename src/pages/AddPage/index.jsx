import React from "react";
import "./style.css";

const AddPage = () => {
  const genres = ["Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical"];

  return (
    <div className="add-page">
      <h1>Add Your Song</h1>
      <form className="add-form">
        <input className="add-input" type="text" placeholder="Song Title" />
        <input className="add-input" type="text" placeholder="Artist" />
        <input className="add-input" type="text" placeholder="Album" />
        <select className="add-input">
          <option value="" disabled selected>
            Select Genre
          </option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label htmlFor="cover">Select Cover Image</label>
        <input
          className="add-input"
          type="file"
          accept="image/*"
          name="cover"
        />
        <label htmlFor="audio">Select Audio File</label>
        <input
          className="add-input"
          type="file"
          accept="audio/*"
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
