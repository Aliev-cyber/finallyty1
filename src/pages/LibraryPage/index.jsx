import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TrackCard from "./TrackCard";
import { useTracksContext } from "../../contexts/TracksContext";
import Pagination from "../../components/Pagination";
import { useAuthContext } from "../../contexts/AuthContext";

const LibraryPage = () => {
  const { tracks, getTracks } = useTracksContext();
  const {LSData} = useAuthContext()
  useEffect(() => {
    getTracks()
  },[])

  return (
    <div>
      <h1 style={{ fontSize: "4rem", color: "white", margin: "3rem 25%" }}>
        Welcome to your Temporary Library
      </h1>
      <Grid container spacing={2}>
        {tracks &&
          tracks.map((track) => {
            if (LSData.includes(track.id)) {
              return <TrackCard track={track} key={track.id} />;
            }
          })}
      </Grid>
    </div>
  );
};

export default LibraryPage;
