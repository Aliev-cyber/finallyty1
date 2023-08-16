import React, { useEffect, useState } from "react";
import "../LikedSongs.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useTracksContext } from "../../contexts/TracksContext";
import { useAuthContext } from "../../contexts/AuthContext";
import CommentList from "../../components/CommentList";
import { useCommentContext } from "../../contexts/CommentContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DetailsPage = () => {
  const { getOneTrack, oneTrack, clearURL, playTrack } = useTracksContext();
  const { user } = useAuthContext();
  const {comments, addComment} = useCommentContext()
  const [track, setTrack] = useState({});
  const { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate()
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
  const handleAddComment = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!newComment) {
      return;
    }
    addComment(
      {
        comment: newComment,
        user: {
          username: user.username,
          avatar: user.avatar,
        },
        trackId: track.id,
        likes: [],
      },
      "trackId",
      track.id
    );
    setNewComment("");
  };
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
      <Box sx={{ width: "80%", margin: "2rem auto" }}>
        <Box sx={{ my: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Add Comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              sx={{ ml: 2 }}>
              Add
            </Button>
          </Box>
        </Box>

        <Accordion expanded={showComments}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => setShowComments(!showComments)}
            aria-controls="comment-panel-content"
            id="comment-panel-header">
            <Typography variant="h4" my={3}>
              Comments ({comments.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommentList
              track={track}
              showComments={showComments}
            />
          </AccordionDetails>
        </Accordion>
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
