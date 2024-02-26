"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { redirect, useRouter } from "next/navigation";

interface PlaylistCardProps {
  title: string;
  image: string;
  id: string;
}

export default function PlaylistCard({
  title,
  image,
  id,
}: PlaylistCardProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

  const checkboxClasses = clsx(
    "checkbox",
    "checkbox-primary",
    "absolute",
    "top-0",
    "right-0",
    "z-10",
    {
      "opacity-100": isSelected,
      "opacity-0 group-hover:opacity-100": !isSelected,
    }
  );

  const router = useRouter();

  const onPlaylistClick = () => {
    router.push(`/home/playlist/${id}`);
  };

  return (
    <div
      className="card-compact bg-base-200 max-w-40 shadow-md   max-h-64 relative group cursor-pointer"
      key={id}
      onClick={onPlaylistClick}
    >
      <img
        src={image}
        height={160}
        width={160}
        style={{ aspectRatio: 1 / 1 }}
      />

      <div className="card-body">
        <Link href={`/home/playlist/${id}`}>
          <h2 className="card-title">{title}</h2>
        </Link>
        <div className="card-actions justify-end">
          <p className="text-gray-700">Playlist</p>
          <div className="justify-end card-actions"></div>
        </div>
      </div>
    </div>
  );
}
