"use client";
import { useEffect, useState } from "react";

interface song {
  _id: string;
  name: string;
  title: string;
  play_count: number;
  duration: number;
  artists: { name: string }[];
  album: string;
  date_added: string; // yyyy-mm-dd
}

interface Playlist {
  title: string;
  description: string;
  image?: string;
  _id: string;
  songs?: song[];
}

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mostPopular, setMostPopular] = useState(false);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [limit, setLimit] = useState(10);

  const getPlaylists = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/playlists");

      const data = await response.json();
      console.log("Playlists:", data.playlists);
      setPlaylists(data.playlists);
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    }
    setLoading(false);
  };

  const searchTracks = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = mostPopular
        ? `http://localhost:3000/api/search?order=desc&limit=${limit.toString()}&title=${search}`
        : `http://localhost:3000/api/search?title=${search}&limit=${limit.toString()}`;
      console.log(url);
      const response = await fetch(url);

      const data = await response.json();
      console.log("Songs:", data.songs);
      setResults(data.songs);
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    }
    setLoading(false);
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    const response = await fetch(
      `http://localhost:3000/api/playlists/${playlistId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: songId }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl p-4 primary ">Search</h1>
      <form onSubmit={searchTracks} className="flex flex-col items-center p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border-2 border-primary rounded-md"
            placeholder="Search for a track"
          />
          <input
            value={limit}
            type="number"
            onChange={(e) => setLimit(e.target.value)}
            className="p-2 border-2 border-primary rounded-md w-20"
            placeholder="Limit"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-md"
          >
            Search
          </button>
        </div>

        <div className="mt-2 flex items-center">
          <label className="label">
            <span className="label-text mr-2">Most Popular</span>
          </label>
          <input
            type="checkbox"
            className="toggle"
            checked={mostPopular}
            onChange={() => {
              setMostPopular(!mostPopular);
            }}
          />
        </div>
      </form>
      {loading && (
        <span className="loading loading-dots loading-lg mx-auto"></span>
      )}
      {error && <p>{error}</p>}
      <div className="flex gap-5 flex-wrap flex-col justify-center sm:align-start sm:justify-start flex-1 p-3 mx-auto ">
        {results.map((track: song, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-base-300 p-5 rounded-md"
          >
            <div className="flex flex-col mr-8">
              <p className="font-bold text-primary">{track.title}</p>
              <p>
                {track.artists?.[0]?.name ||
                  track.artists ||
                  track.artist ||
                  "Unknown Artist"}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-bold">{formatPlayCount(track.play_count)}</p>
              <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2  bg-base-100 rounded-box w-52 mt-4 shadow-lg"
                >
                  {playlists.map((playlist, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        addSongToPlaylist(playlist._id, track._id);
                      }}
                    >
                      <a>{playlist.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatPlayCount(playCount: number) {
  if (playCount >= 1000000) {
    return `${Math.floor(playCount / 1000000)}M`;
  } else if (playCount >= 1000) {
    return `${Math.floor(playCount / 1000)}K`;
  } else {
    return playCount.toString();
  }
}
