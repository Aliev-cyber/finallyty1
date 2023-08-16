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
import { useAuthContext } from "../../contexts/AuthContext";

const DetailsPage = () => {
  const { getOneTrack, oneTrack, clearURL, playTrack } = useTracksContext();
  const { user } = useAuthContext();
  const [track, setTrack] = useState({});
  const { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      getOneTrack(id);
    }, 50);
  }, [id, openEditModal]);

  useEffect(() => {
    if (oneTrack) {
      setTrack({ ...oneTrack });
    }
  }, [oneTrack]);

  function handleClick() {
    clearURL();
    playTrack(id);
  }

  function handleDelete() {
    setOpenDeleteModal(true);
  }
  function handleEdit() {
    setOpenEditModal(true);
  }

  return (
    <div className="liked-songs-container">
      <header className="app-header">
        <img className="app-logo" src={track.cover_image} alt="Spotify Logo" />
        <h1 className="app-header">
          {`${track.title} by ${"aaaaaaaaaaaaaaaaaaaaaaaaa"}`.slice(0, 18)}
        </h1>
      </header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <div className="play-all-icon" onClick={handleClick}>
            <PlayCircleIcon className="icon-larger" />
          </div>
          {user && user.is_staff && (
            <div style={{ margin: "0 2rem" }}>
              <IconButton onClick={handleDelete} style={{ color: "red" }}>
                <DeleteIcon sx={{ fontSize: "4rem" }} />
              </IconButton>
              <IconButton
                onClick={handleEdit}
                style={{color: "green" }}
              >
                <EditIcon sx={{ fontSize: "4rem" }} />
              </IconButton>
            </div>
          )}
        </Box>
        <div
          style={{
            color: "white",
            marginTop: "40px",
            marginLeft: "15px",
            fontWeight: "bold",
            fontSize: "50px",
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
            fontSize: "30px",
          }}
        >
          {track.lyrics}
        </span>
      </Box>
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        track={track}
      />
      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        track={track}
      />
    </div>
  );
};

export default DetailsPage;
