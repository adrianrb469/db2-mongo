import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/playlists");
  const client = await db;
  const playlists = client
    .db("p1")
    .collection("Playlist")
    .find({}, { projection: { title: 1, image: 1 } });
  return new NextResponse(
    JSON.stringify({ playlists: await playlists.toArray() }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  console.log("POST /api/playlists");
  const client = await db;

  const body = await request.json();

  const newPlaylist = {
    ...body,
    songs: [],
  };

  const playlist = await client
    .db("p1")
    .collection("Playlist")
    .insertOne(newPlaylist);

  return new NextResponse(JSON.stringify({ playlist: playlist.insertedId }), {
    status: 201,
  });
}
