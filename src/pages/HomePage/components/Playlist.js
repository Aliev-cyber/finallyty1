import { useState, useLayoutEffect } from 'react';
import useEvent from '../hooks/useEvent';
import useMenu from '../hooks/useContextMenu';
import useModal from '../hooks/useModal';
import PlaylistCover from './PlaylistCover';
import PlaylistButtonPlay from './PlaylistButtonPlay';
import PlaylistTitle from './PlaylistTitle';
import PlaylistContextMenu from './PlaylistContextMenu';
import TheModalEmbedPlaylist from './TheModalEmbedPlaylist';
import TheModalRecommendations from './TheModalRecommendations';
import { useNavigate } from 'react-router-dom';

function Playlist({
  classes,
  coverUrl,
  title,
  id,
  toggleScrolling,
}) {
  function generateMenuItems(isAlternate = false) {
    return [
      {
        label: 'Add to Your Library',
        action: () => {
          menu.close();
          document.querySelector('nav a:nth-child(4)').click();
        },
      },
    ];
  }
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState(generateMenuItems);
  const menu = useMenu(menuItems);
  const embedPlaylistModal = useModal();
  const recommendationsModal = useModal();

  useLayoutEffect(() => toggleScrolling(!menu.isOpen));

  useEvent('keydown', handleAltKeydown, menu.isOpen);
  useEvent('keyup', handleAltKeyup, menu.isOpen);

  function handleAltKeydown({ key }) {
    if (key === 'Alt') setMenuItems(generateMenuItems(true));
  }

  function handleAltKeyup({ key }) {
    if (key === 'Alt') setMenuItems(generateMenuItems());
  }
  function handleClick(e) {
    e.preventDefault()
    navigate(`/tracks/${id}`)
  }
  const bgClasses = menu.isOpen
    ? 'bg-[#272727]'
    : 'bg-[#181818] hover:bg-[#272727]';

  return (
    <div
      className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
      onClick={handleClick}
      onContextMenu={menu.open}
      style={{cursor:'pointer'}}
    >
      <div className="relative">
        <PlaylistCover url={coverUrl} />
        <PlaylistButtonPlay />
      </div>
      <PlaylistTitle title={title} />
      {menu.isOpen && (
        <PlaylistContextMenu
          ref={menu.ref}
          menuItems={menu.items}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
      {recommendationsModal.isOpen && (
        <TheModalRecommendations onClose={recommendationsModal.close} />
      )}
      {embedPlaylistModal.isOpen && (
        <TheModalEmbedPlaylist onClose={embedPlaylistModal.close} />
      )}
    </div>
  );
}

export default Playlist;
