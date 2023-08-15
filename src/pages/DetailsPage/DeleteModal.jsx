import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTracksContext } from "../../contexts/TracksContext";

const DeleteModal = ({ open, setOpen, track }) => {
  const navigate = useNavigate();
  const { deleteTrack } = useTracksContext();
  function handleDeleteUser() {
    deleteTrack(track.id);
    navigate("/library");
    handleClose();
  }
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
          Confirm Track Deletion
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          Are you sure you want to delete track {track.title} by {track.artist}?
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleClose}
          sx={{ marginBottom: "1rem" }}
        >
          No, sorry
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteUser}>
          Delete Track
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
