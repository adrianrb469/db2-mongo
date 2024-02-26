"use client";
import Modal from "@/components/modal";
import { useEffect, useRef, useState } from "react";

export default function NewPlaylist() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function onClose() {
    setModalVisible(false);
  }

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPlaylist = await fetch("http://localhost:3000/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: description,
          image: imageUrl,
        }),
      });

      console.log(newPlaylist);
      setModalVisible(false);
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
        title="Create a new playlist"
        visible={modalVisible}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit} className="form-control">
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
          <textarea
            className="textarea h-24 textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => setModalVisible(false)}>
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
