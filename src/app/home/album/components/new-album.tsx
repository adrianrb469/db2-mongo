"use client";

import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NewPlaylist() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  function onClose() {
    setModalVisible(false);
  }

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible]);

  const [songs, setSongs] = useState([]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const newPlaylist = await fetch("http://localhost:3000/api/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: description,
          image: imageUrl,
        }),

        cache: "no-store",
      });

      const { playlist } = await newPlaylist.json();
      console.log(playlist);
      setModalVisible(false);

      //push id to current route
      router.push(`/home/playlist/${playlist}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setModalVisible(true)}>
        Create Playlist
      </button>
      <Modal
        title="Create a new album"
        visible={modalVisible}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit} className="form-control">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="textarea h-24 textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              className="input input-bordered"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => setModalVisible(false)}
              type="button"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
