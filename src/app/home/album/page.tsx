import AlbumCard from "@/components/album.tsx/card";
import NewAlbum from "./components/new-album";

type Album = {
  name: string;
  image: string;
  _id: string;
};

export default async function Albums() {
  const response = await fetch("http://localhost:3000/api/albums");
  const { albums } = await response.json();

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl p-4 primary ">Albums</h1>
      <div className="flex gap-5 flex-wrap justify-center sm:align-start sm:justify-start flex-1 p-3">
        {albums.map((album: Album) => (
          <AlbumCard title={album.name} image={album.image} id={album._id} />
        ))}
      </div>
      <div className="flex p-4 gap-2 justify-end">
        <NewAlbum />
      </div>
    </div>
  );
}
