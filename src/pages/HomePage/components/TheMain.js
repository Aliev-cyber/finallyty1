import Playlist from "./Playlist";

const playlists = [
  {
    classes: "",
    title: "Playlist title 1",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/7f1d1d/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden sm:block",
    title: "Playlist title 2",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden lg:block",
    title: "Playlist title 3",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden xl:block",
    title: "Playlist title 4",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/1e3a8a/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 2xl:block",
    title: "Playlist title 5",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 3xl:block",
    title: "Playlist title 6",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 4xl:block",
    title: "Playlist title 7",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/1e3a8a/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 5xl:block",
    title: "Playlist title 8",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 6xl:block",
    title: "Playlist title 9",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
];

function TheMain({ showToast, toggleScrolling }) {
  return (
    <main className="text-white relative">
      <div className="h-[275px] bg-gradient-to-b from-[#1f1f1f] to-[#121212] absolute w-full"></div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div>
          <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
            <div>
              <h2 className="text-2xl font-semibold hover:underline capitalize">
                <a href="/">Lorem ipsum dolor sit</a>
              </h2>
            </div>
            <a
              href="/"
              className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
            >
              See all
            </a>
          </div>
          <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
            {playlists.map((playlist) => (
              <Playlist
                key={playlist.title}
                showToast={showToast}
                toggleScrolling={toggleScrolling}
                {...playlist}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div>
          <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
            <div>
              <h2 className="text-2xl font-semibold hover:underline capitalize">
                <a href="/">Lorem ipsum dolor sit</a>
              </h2>
            </div>
            <a
              href="/"
              className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
            >
              See all
            </a>
          </div>
          <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
            {playlists.map((playlist) => (
              <Playlist
                key={playlist.title}
                showToast={showToast}
                toggleScrolling={toggleScrolling}
                {...playlist}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div>
          <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
            <div>
              <h2 className="text-2xl font-semibold hover:underline capitalize">
                <a href="/">Lorem ipsum dolor sit</a>
              </h2>
            </div>
            <a
              href="/"
              className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
            >
              See all
            </a>
          </div>
          <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-5">
            {playlists.map((playlist) => (
              <Playlist
                key={playlist.title}
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
