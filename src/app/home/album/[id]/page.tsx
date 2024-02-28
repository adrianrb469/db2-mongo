"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { toast } from "sonner";

interface Song {
  song_id: string;
  name: string;
  duration: number;
  artist: string;
  album: string;
  date_added: string; // yyyy-mm-dd
}

interface album {
  name: string;
  description: string;
  image?: string;
  _id?: string;
  songs?: Song[];
}

async function getalbum(id: string) {
  const response = await fetch(`http://localhost:3000/api/albums/${id}`);
  const data = await response.json();
  console.log(data);
  return data.album;
}

export default function album() {
  const [album, setalbum] = useState<album | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [results, setResults] = useState([]);

  const handleSelect = (id: string) => {
    if (selectedSongs.includes(id)) {
      setSelectedSongs(selectedSongs.filter((songId) => songId !== id));
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  const selectAll = () => {
    if (!album) return;
    if (!album.songs) return;

    if (selectedSongs.length === album.songs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(album.songs.map((song) => song.song_id));
    }
  };

  const handleSongSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSongToAdd(event.target.value);
  };

  const addSongToAlbum = async () => {
    if (!selectedSongToAdd) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/albums/" + params.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            songId: selectedSongToAdd,
          }),
        }
      );

      const data = await response.json();

      if (data.album && data.album.songs) {
        setalbum(data.album);
      }

      toast.success("Song added successfully.");
      setAddSongModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [addSongModalVisible, setAddSongModalVisible] = useState(false);
  const [selectedSongToAdd, setSelectedSongToAdd] = useState<string | null>(
    null
  );

  const params = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    params.id && getalbum(params.id).then((data) => setalbum(data));

    const getResults = async () => {
      const response = await fetch("http://localhost:3000/api/search");
      const data = await response.json();
      setResults(data.songs);
    };

    getResults();
  }, []);

  const updatealbum = async (event: Event) => {
    event.preventDefault();
    try {
      const updatedalbum = await fetch(
        "http://localhost:3000/api/albums/" + params.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: name,
            description: description,
          }),
        }
      );

      await updatedalbum.json();

      setalbum({
        ...album,
        title: name,
        description: description,
      });

      toast.success("album update d successfully.");

      setEditModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeSongs = async () => {
    if (!album) return;
    if (!album.songs) return;
    if (selectedSongs.length === 0) return;

    console.log("Removing songs", selectedSongs);

    try {
      const updatedalbum = await fetch(
        "http://localhost:3000/api/albums/" + params.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            songsToRemove: selectedSongs,
          }),
          cache: "no-cache",
        }
      );

      const x = await updatedalbum.json();
      console.log(x);
      setalbum({
        ...album,
        songs: album.songs.filter(
          (song) => !selectedSongs.includes(song.id_song)
        ),
      });

      setSelectedSongs([]);

      toast.success("Songs removed successfully.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {album && (
        <>
          <div className="flex w-full  bg-base-300 justify-start  p-4   shadow-inner ">
            <img src={album.image} className="h-60 w-60 shadow-lg " />
            <div
              className="flex flex-col pl-4 justify-center cursor-pointer"
              onClick={() => {
                setName(album.title);
                setDescription(album.description);

                setEditModalVisible(true);
              }}
            >
              <p>
                <span className="text-gray-600 text-sm cursor-pointer">
                  Public album
                </span>
              </p>
              <h1 className="text-6xl primary bg-gradient-to-r from-primary/50  to-primary inline-block text-transparent bg-clip-text cursor-pointer p-2">
                {album.name}
              </h1>
              <p className="text-gray-500 text-lg cursor-pointer ">
                {album.description}
              </p>
            </div>
          </div>
          <button
            className="btn  btn-primary btn-accent w-fit m-4"
            onClick={() => setAddSongModalVisible(true)}
          >
            Add Song
          </button>
          <Modal
            title="Edit album"
            visible={editModalVisible}
            onClose={() => {
              setEditModalVisible(false);
            }}
          >
            <form className="form-control" onSubmit={updatealbum}>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                className="input input-bordered mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="modal-action">
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setEditModalVisible(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </Modal>
          <div className="flex-1 ">
            <div className="overflow-x-auto ">
              <table className="table  mx-auto ">
                <thead>
                  <tr>
                    <th className=" w-5">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={
                            selectedSongs.length === album.songs.length
                              ? true
                              : false
                          }
                          onChange={() => {
                            selectAll();
                          }}
                        />
                      </label>
                    </th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Plays</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {album.songs.length > 0 ? (
                    album.songs.map((song, index) => (
                      <tr key={index}>
                        <th>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={
                                selectedSongs.includes(song.id_song)
                                  ? true
                                  : false
                              }
                              onChange={() => handleSelect(song.id_song)}
                            />
                          </label>
                        </th>

                        <td>{index + 1}</td>
                        <td>
                          {song.artist || song.artists || "Unknown Artist"}-{" "}
                          {song.name}
                        </td>
                        <td> {song.plays}</td>
                        <td>{formatDuration(song.duration)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No songs in this album</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Add new song */}
              <Modal
                title="Add Song"
                visible={addSongModalVisible}
                onClose={() => {
                  setAddSongModalVisible(false);
                }}
              >
                <form className="form-control" onSubmit={addSongToAlbum}>
                  <label className="label">
                    <span className="label-text">Select Song</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={selectedSongToAdd}
                    onChange={handleSongSelect}
                  >
                    <option value="">Select a song</option>
                    {results.map((song) => (
                      <option key={song._id} value={song._id}>
                        {song.title}
                      </option>
                    ))}
                  </select>
                  <div className="modal-action">
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => setAddSongModalVisible(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary">Add Song</button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
          {selectedSongs.length > 0 && (
            <div className="flex justify-end p-4  bg-base-300 max-w-lg mx-auto  rounded-lg  items-center space-x-5 mb-4 ">
              {selectedSongs.length > 1 ? (
                <p>{selectedSongs.length} songs selected</p>
              ) : (
                <p>{selectedSongs.length} song selected</p>
              )}
              <button
                className="btn btn-primary btn-accent"
                onClick={() => {
                  removeSongs();
                }}
              >
                Remove From album
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
