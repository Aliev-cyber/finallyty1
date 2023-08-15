import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTracksContext } from "../../contexts/TracksContext";

const TrackCard = ({ track }) => {
  const navigate = useNavigate("");
  const { deleteTrack } = useTracksContext();
  function handleClick() {
    navigate(`/details/${track.id}`);
  }
  function handleDelete(e) {
    e.preventDefault();
    deleteTrack(track.id);
  }
  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          backgroundColor: "#222222",
          color: "white",
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "14rem", objectFit: "cover" }}
          image={track.cover_image_url}
          alt={track.title}
          onClick={handleClick}
        />
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginBottom: "0.5rem",
            }}
            onClick={handleClick}
          >
            {track.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
            onClick={handleClick}
          >
            {track.artist} - {track.album}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "1rem" }}
            onClick={handleClick}
          >
            {formatDuration(track.duration_seconds)}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="delete"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackCard;
