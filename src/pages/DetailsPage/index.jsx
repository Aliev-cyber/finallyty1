import React, { useEffect, useState } from "react";
import "../LikedSongs.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useTracksContext } from "../../contexts/TracksContext";

const DetailsPage = () => {
  const { getOneTrack, oneTrack, clearURL, playTrack } = useTracksContext();
  const [track, setTrack] = useState({});
  const { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      getOneTrack(id);
    }, 50)
  }, [id, openEditModal]);
  
  useEffect(() => {
    if (oneTrack) {
      setTrack({ ...oneTrack });
    }
  }, [oneTrack]);
  
  function handleClick() {
    clearURL();
    clearURL();
    playTrack(id);
  }
  
  function handleDelete() {
    setOpenDeleteModal(true);
  }
  function handleEdit() {
    setOpenEditModal(true)
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
        
        <IconButton
          onClick={handleDelete}
          style={{ marginTop: "20px", color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleEdit}
          style={{ marginTop: "20px", color: "green" }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} track={track}/>
      <EditModal open={openEditModal} setOpen={setOpenEditModal} track={track}/>

    </div>
  );
};

export default DetailsPage;
