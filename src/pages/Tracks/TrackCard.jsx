import React, { useEffect, useLayoutEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useContextMenu from "../HomePage/hooks/useContextMenu";
import useEvent from "../HomePage/hooks/useEvent";
import PlaylistContextMenu from "../HomePage/components/PlaylistContextMenu";
import { useAuthContext } from "../../contexts/AuthContext";

const TrackCard = ({ track }) => {
  const navigate = useNavigate("");
  const { toggleFavorite, checkFavorite} = useAuthContext()
  function handleClick() {
    navigate(`/details/${track.id}`);
  }
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(true)
  function toggleScrolling(isEnabled) {
    setIsScrollingEnabled(isEnabled)
  }

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  function generateMenuItems(isAlternate = false) {
    return [
      {
        label: !checkFavorite(track.id)?'Add to Your Library':"Remove from Your Library",
        action: () => {
          menu.close();
          toggleFavorite(track.id);
        },
      },
    ];
  }
  const [menuItems, setMenuItems] = useState(generateMenuItems);
  const menu = useContextMenu(menuItems);
  useLayoutEffect(() => toggleScrolling(!menu.isOpen));

  useEvent("keydown", handleAltKeydown, menu.isOpen);
  useEvent("keyup", handleAltKeyup, menu.isOpen);
  function handleAltKeydown({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems(true));
  }

  function handleAltKeyup({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems());
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        onContextMenu={menu.open}
        sx={{
          backgroundColor: "#222222",
          color: "white",
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => setMenuItems(generateMenuItems())}
        onMouseLeave={() => {
          setMenuItems([]);
          if (menu.isOpen) {
            menu.close();
          }
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "14rem", objectFit: "cover" }}
          image={track.cover_image}
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
          {menu.isOpen && (
            <PlaylistContextMenu
              ref={menu.ref}
              menuItems={menu.items}
              classes="fixed divide-y divide-[#3e3e3e]"
            />
          )}
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackCard;
