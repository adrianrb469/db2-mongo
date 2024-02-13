import PlaylistCard from "@/components/playlist.tsx/card";

async function getPlaylists() {
  const response = await fetch("http://localhost:3000/api/playlists");
  const data = await response.json();

  console.log(data.playlists);
  return data.playlists;
}

interface Playlist {
  title: string;
  image: string;
  _id: string;
}

export default async function Playlists() {
  const playlists: Playlist[] = await getPlaylists();

  return (
    <div className="flex gap-5 flex-wrap justify-center sm:align-start sm:justify-start">
      {playlists.map((playlist) => (
        <PlaylistCard
          title={playlist.title}
          image={playlist.image}
          id={playlist._id}
        />
      ))}
    </div>
  );
}
