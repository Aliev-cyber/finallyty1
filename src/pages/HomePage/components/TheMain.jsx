import { useNavigate } from "react-router-dom";
import Playlist from "./Playlist";
import { useTracksContext } from "../../../contexts/TracksContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";


function TheMain({ showToast, toggleScrolling }) {
  const navigate = useNavigate();
  const {tracks, getTracks} = useTracksContext()
  useEffect(() => {
    getTracks()
  },[])
  return (
    <main className="text-white relative">
      <div className="h-[275px] bg-gradient-to-b from-[#1f1f1f] to-[#121212] absolute w-full"></div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div>
          <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
            <div>
              <h2 className="text-2xl font-semibold hover:underline capitalize">
                <span style={{cursor: 'pointer'}} onClick={() => navigate('/tracks')}>Check out these awesome tracks</span>
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
            {tracks.slice(0,12).map((playlist) => (
              <Playlist
                key={playlist.id}
                showToast={showToast}
                toggleScrolling={toggleScrolling}
                {...playlist}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default TheMain;
