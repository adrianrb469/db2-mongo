import Link from "next/link";

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
  return (
    <div className="card-compact  bg-base-200  max-w-40 shadow-md" id={id}>
      <img src={image} />

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
