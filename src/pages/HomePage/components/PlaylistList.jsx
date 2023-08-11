import React from "react";
import List from "@mui/material/List";
import PlayListItem from "./PlayListItem";

const playlists = [
  { name: "My playlist №1" },
  { name: "My playlist №2" },
  { name: "My playlist №3" },
  { name: "My playlist №4" },
  { name: "My playlist №5" },
  { name: "My playlist №6" },
];

export default function PlaylistList() {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "dark",
        height: "30vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "#131313",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#262626",
          borderRadius: "4px", 
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#393939",
        },
      }}
    >
      {playlists.map((item, index) => (
        <PlayListItem key={index} item={item} />
      ))}
    </List>
  );
}
