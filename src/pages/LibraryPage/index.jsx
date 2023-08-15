import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TrackCard from "./TrackCard";
import { useTracksContext } from "../../contexts/TracksContext";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

const LibraryPage = () => {
  const { tracks, getTracks} = useTracksContext();
	const [searchParams] = useSearchParams();

  useEffect(() => {
    getTracks();
  }, [searchParams]);

  return (
    <div>
      <h1 style={{ fontSize: "4rem", color: "white", margin: "3rem 25%" }}>
        Welcome to your Library
      </h1>
      <Grid container spacing={2}>
        {tracks && tracks.map((track) => {
            return <TrackCard track={track} key={track.id}/>
      })}
      </Grid>
      <Pagination/>
    </div>
  );
};

export default LibraryPage;
