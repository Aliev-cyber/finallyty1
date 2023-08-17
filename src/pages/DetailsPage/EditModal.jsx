import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTracksContext } from "../../contexts/TracksContext";

const genres = [
  "Charts",
  "Events",
  "At Home",
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
const EditModal = ({ open, setOpen, track }) => {
  const navigate = useNavigate();
  const { editTrack, getOneTrack, oneTrack } = useTracksContext();
  const [editedTrack, setEditedTrack] = useState({ ...track });
  const [image, setImage] = useState();

  useEffect(() => {
    getOneTrack(track.id);
  }, [track.id]);

  useEffect(() => {
    if (oneTrack) {
      setEditedTrack({ ...oneTrack });
    }
  }, [oneTrack]);
  function isValidYouTubeUrl(url) {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$/;
    return youtubeRegex.test(url);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTrack((prevTrack) => ({
      ...prevTrack,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    const testImage = new Image();
    testImage.src = editedTrack.cover_image;
    setImage(testImage.src);
    testImage.onerror = () => {
      setImage(
        "https://gifdb.com/images/high/static-glitch-image-not-found-labitbee4o34s4cs.gif"
      );
    };

    editTrack(track.id, {
      ...editedTrack,
      cover_image: image,
      audio_file: isValidYouTubeUrl(editedTrack.audio_file)
        ? editedTrack.audio_file
        : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D",
    });
    navigate(`/details/${track.id}`);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: "2rem",
          borderRadius: "4px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Track
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={editedTrack.title}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Artist"
          name="artist"
          value={editedTrack.artist}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Lyrics"
          name="lyrics"
          value={editedTrack.lyrics}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <Select
          label="Genre"
          name="genre"
          value={editedTrack.genre}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        >
          {/* Render menu items for genres */}
          {genres.map((genre, index) => (
            <MenuItem key={index} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Cover Image URL"
          name="cover_image"
          value={editedTrack.cover_image}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Audio File URL"
          name="audio_file"
          value={editedTrack.audio_file}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Release Year"
          name="release_year"
          value={editedTrack.release_year}
          onChange={handleChange}
          type="number"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Duration in Seconds"
          name="duration_seconds"
          value={editedTrack.duration_seconds}
          onChange={handleChange}
          type="number"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleClose}
          sx={{ marginBottom: "1rem" }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
