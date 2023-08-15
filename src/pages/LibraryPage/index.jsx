import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TrackCard from "./TrackCard";
import { useTracksContext } from "../../contexts/TracksContext";

const LibraryPage = () => {
  const { tracks, getTracks } = useTracksContext();
  useEffect(() => {
    getTracks();
  }, []);
  // const tracks = [{
  //   id: 1,
  //   cover_image_url:
  //     "https://resources.tidal.com/images/58cb2c48/ea88/4ffe/9847/822e0e4017e4/750x750.jpg",
  //   title: "All Eyez on Me",
  //   artist: "2PAC",
  //   genre: "Pop",
  //   album: "leg",
  //   duration_seconds: "3:30",
  //   release_year: "2000",
  //   audio_file: null,
  //   lyrics: "I bet you got it twisted, you don't know who to trust...",
  // }, {
  //   id: 2,
  //   cover_image_url:
  //     "https://resources.tidal.com/images/58cb2c48/ea88/4ffe/9847/822e0e4017e4/750x750.jpg",
  //   title: "All Eyez on Me",
  //   artist: "2PAC",
  //   genre: "Pop",
  //   album: "leg",
  //   duration_seconds: "3:30",
  //   release_year: "2000",
  //   audio_file: null,
  //   lyrics: "I bet you got it twisted, you don't know who to trust...",
  // }];

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
    </div>
  );
};

export default LibraryPage;
