import PlaylistCard from "@/components/playlist.tsx/card";
import NewPlaylist from "./components/new-playlist";
async function getPlaylists() {
  const response = await fetch("http://localhost:3000/api/playlists");
  const data = await response.json();

  console.log(data.playlists);
  return data.playlists;
}

interface Playlist {
  title: string;
  image: string;
  id: string;
}

export default async function Playlists() {
  let playlists: Playlist[] = await getPlaylists();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl p-4 primary ">Playlists</h1>
      <div className="flex gap-5 flex-wrap justify-center sm:align-start sm:justify-start flex-1 p-3">
        {playlists.map((playlist, index) => (
          <PlaylistCard
            title={playlist.title}
            image={playlist.image}
            id={playlist._id}
          />
        ))}
      </div>
      <div className="flex p-4 gap-2 justify-end">
        <NewPlaylist />
      </div>
    </div>
  );
}
