import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";

const SearchPage = () => {
  return (
    <header>
      <div className="search-bar">
        <SearchIcon className="search-icon" sx={{fontSize : '40px'}}/>
        <input
          className="search-input"
          placeholder="What do you want to listen to?"
          inputProps={{ 'aria-label': 'search', style: { color: 'white' } }}
        />
      </div>
    </header>
  );
};

export default SearchPage;
