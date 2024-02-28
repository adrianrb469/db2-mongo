"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { toast } from "sonner";

interface Song {
  id: string;
  title: string;
  duration: number;
  artists: string[];
  play_count: number;
}

export default function Songs() {
  async function getSong(id: string) {
    const response = await fetch(`http://localhost:3000/api/song/${id}`);
    const data = await response.json();
    setSong(data.song[0]);
    console.log(data.song[0]);
  }

  const [song, setSong] = useState<Song | null>(null);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    console.log(params.id);
    params.id && getSong(params.id);
  }, []);
  return (
    <div>
      <h1>Song</h1>
      {song && (
        <div>
          <h2>{song.title}</h2>
          <p>Duration: {song.duration}</p>
          <p>Play count: {song.play_count}</p>
        </div>
      )}
    </div>
  );
}
