import AlbumCard from "@/components/album.tsx/card";
import NewAlbum from "./components/new-album";

async function getAlbums() {
  const response = await fetch("http://localhost:3000/api/albums");
  const data = await response.json();

  console.log(data.albums);
  return data.albums;
}

interface Album {
  title: string;
  image: string;
  _id: string;
}
