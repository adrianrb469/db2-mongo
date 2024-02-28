import React from 'react';

// Define your interfaces here or import them if they are defined in another file
interface Song {
  id_song: number;
  name: string;
  artist: string;
}

interface Album {
  name: string;
  release_date: string;
  coverImageUrl?: string;
  songs: Song[];
}

const AlbumCard: React.FC<{ album: Album }> = ({ album }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={album.coverImageUrl || '/default-album-cover.png'} alt="Album Cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{album.name}</h2>
        <p>Release Date: {album.release_date}</p>
        <div>
          <h3>Songs:</h3>
          <ul>
            {album.songs.map((song) => (
              <li key={song.id_song}>{song.name} - {song.artist}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
