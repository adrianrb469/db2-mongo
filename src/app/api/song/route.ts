import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/song");
  const client = await db;
  const songs = client
    .db("p1")
    .collection("Song")
    .find({}, { projection: { _id:1 , title: 1, duration: 1, artists: 1, play_count: 1}});
  return new NextResponse(
    JSON.stringify({ songs: await songs.toArray() }),
    { status: 200 }
  );
}

// Add a song to the database
export async function POST(request: Request) {
  console.log("POST /api/song");
  const client = await db;

  const body = await request.json();

  const newSong = {
    ...body,
  };

  const song = await client
    .db("p1")
    .collection("Song")
    .insertOne(newSong);

  return new NextResponse(JSON.stringify({ song: song.insertedId }), {
    status: 201,
  });
}
