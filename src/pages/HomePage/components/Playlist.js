import { useState, useLayoutEffect } from "react";
import useEvent from "../hooks/useEvent";
import useMenu from "../hooks/useContextMenu";
import useModal from "../hooks/useModal";
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistContextMenu from "./PlaylistContextMenu";
import TheModalEmbedPlaylist from "./TheModalEmbedPlaylist";
import TheModalRecommendations from "./TheModalRecommendations";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

function Playlist({ classes, cover_image, title, id, toggleScrolling }) {
  const { toggleFavorite, favorites, checkFavorite } = useAuthContext();
  function generateMenuItems(isAlternate = false) {
    return [
      {
        label: !checkFavorite(id)
          ? "Add to Your Library"
          : "Remove from Your Library",
        action: () => {
          menu.close();
          toggleFavorite(id);
        },
      },
    ];
  }
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(generateMenuItems);
  const menu = useMenu(menuItems);
  const embedPlaylistModal = useModal();
  const recommendationsModal = useModal();

  useLayoutEffect(() => toggleScrolling(!menu.isOpen));

  useEvent("keydown", handleAltKeydown, menu.isOpen);
  useEvent("keyup", handleAltKeyup, menu.isOpen);

  function handleAltKeydown({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems(true));
  }

  function handleAltKeyup({ key }) {
    if (key === "Alt") setMenuItems(generateMenuItems());
  }
  function handleClick(e) {
    e.preventDefault();
    navigate(`/details/${id}`);
  }
  const bgClasses = menu.isOpen
    ? "bg-[#272727]"
    : "bg-[#181818] hover:bg-[#272727]";

  return (
    <div
      className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
      onContextMenu={menu.open}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setMenuItems(generateMenuItems())}
      onMouseLeave={() => {
        setMenuItems([]);
        if (menu.isOpen) {
          menu.close();
        }
      }}
    >
      <div className="relative" onClick={handleClick}>
        <PlaylistCover url={cover_image} />
        <PlaylistButtonPlay />
      </div>
      <PlaylistTitle title={title} onClick={handleClick} />
      {menu.isOpen && (
        <PlaylistContextMenu
          ref={menu.ref}
          menuItems={menu.items}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </div>
  );
}

export default Playlist;
