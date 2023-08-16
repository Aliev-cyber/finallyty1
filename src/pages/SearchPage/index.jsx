import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import { useTracksContext } from "../../contexts/TracksContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import TrackCard from "../Tracks/TrackCard";
import { Grid } from "@mui/material";

const SearchPage = () => {
  const cardData = [
    { id: "Charts", color: "rgb(71, 125, 149)" },
    { id: "Events", color: "rgb(141, 103, 171)" },
    { id: "At-Home", color: "rgb(30, 50, 100)" },
    { id: "Eras", color: "rgb(140, 25, 50)" },
    { id: "Hip-Hop", color: "rgb(141, 103, 171)" },
    { id: "Wellness", color: "rgb(220, 20, 140)" },
    { id: "Workout", color: "rgb(186, 93, 7)" },
    { id: "Relax", color: "rgb(13, 115, 236)" },
    { id: "Focus", color: "rgb(30, 50, 100)" },
    { id: "Sleep", color: "rgb(141, 103, 171)" },
    { id: "Dance", color: "rgb(30, 50, 100)" },
    { id: "Jazz", color: "rgb(186, 93, 7)" },
  ];
  const { getTracks, tracks } = useTracksContext(); // Get page and setPage from context
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [byTitle, setByTitle] = useState([]);
  const [byArtist, setByArtist] = useState([]);
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearchParams({
          title_like: searchQuery,
          _limit: 8,
        });
        const titleSearchResults = await getTracks();
        setByTitle([...titleSearchResults]);
        setSearchParams({
          artist_like: searchQuery,
          _limit: 8,
        });
        const artistSearchResults = await getTracks();
        setByArtist([...artistSearchResults]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchQuery]);
  return (
    <header>
      <div className="search-bar">
        <SearchIcon className="search-icon" sx={{ fontSize: "40px" }} />
        <input
          className="search-input"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={handleSearchChange}
          inputprops={{ "aria-label": "search", style: { color: "white" } }}
        />
      </div>
      {searchQuery && (
        <div>
          <h1
            style={{
              fontSize: "3rem",
              color: "white",
              margin: "3rem 25%",
              cursor: "pointer",
            }}
          >
            Find tracks by their title: `"{searchQuery}"`
          </h1>
          <Grid container spacing={2}>
            {byTitle &&
              byTitle.map((track) => {
                return <TrackCard track={track} key={track.id} />;
              })}
          </Grid>
          <h1
            style={{
              fontSize: "3rem",
              color: "white",
              margin: "3rem 25%",
              cursor: "pointer",
            }}
          >
            Find tracks by their artists: "{searchQuery}"
          </h1>
          <Grid container spacing={2}>
            {byArtist &&
              byArtist.map((track) => {
                return <TrackCard track={track} key={track.id} />;
              })}
          </Grid>
        </div>
      )}
      {!searchQuery && (
        <div>
          <div>
            <h1 className="h1">Browse All</h1>
          </div>
          <div className="card-container">
            {cardData.map((card, index) => (
              <div
                className="card"
                key={index}
                style={{ background: card.color }}
                onClick={() => navigate(`/library/${card.id}`)}
              >
                <div className="logo">
                  <h1>{card.id}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default SearchPage;
