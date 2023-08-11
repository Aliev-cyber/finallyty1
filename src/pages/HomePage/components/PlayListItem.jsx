import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function PlayListItem({ item }) {
  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 24, color: "white" }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="body1" color="white">{item.name}</Typography>}
      />
    </ListItem>
  );
}
