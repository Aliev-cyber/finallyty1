import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

const SearchPage = () => {
  const cardData = [
    { id: "Charts", color: "rgb(71, 125, 149)" },
    { id: "Events", color: "rgb(141, 103, 171)" },
    { id: "At Home", color: "rgb(30, 50, 100)" },
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
  
  return (
    <header>
      <div className="search-bar">
        <SearchIcon className="search-icon" sx={{ fontSize: "40px" }} />
        <input
          className="search-input"
          placeholder="What do you want to listen to?"
          inputprops={{ "aria-label": "search", style: { color: "white" } }}
        />
      </div>
      <div>
        <h1 className="h1">Browse All</h1>
      </div>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div className="card" key={index} style={{ background: card.color }}>
            <div className="logo">
              <h1>{card.id}</h1>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default SearchPage;
