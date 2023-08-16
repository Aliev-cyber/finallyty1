import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TrackCard from "./TrackCard";
import { useTracksContext } from "../../contexts/TracksContext";
import Pagination from "../../components/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Tracks = () => {
  const { tracks, getTracks, page, setPage } = useTracksContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { genre } = useParams();
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setPage(1)
    if (genre) {
      setSearchParams({
        ...currentParams,
        genre_like: genre,
        _page: page,
        _limit: 12
      });
      getTracks();
    } else {
      setSearchParams({
        ...currentParams,
        _page: page,
        _limit: 12
      });
      getTracks();
    }
  }, [searchParams]);

  return (
    <div>
      <h1 style={{ fontSize: "4rem", color: "white", margin: "3rem 25%" }}>
        Welcome to your Library
      </h1>
      <Grid container spacing={2}>
        {tracks &&
          tracks.map((track) => {
            return <TrackCard track={track} key={track.id} />;
          })}
      </Grid>
      <Pagination />
    </div>
  );
};

export default Tracks;
