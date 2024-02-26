import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const playlistId = context.params.id;

  if (!playlistId) {
    return new NextResponse(
      JSON.stringify({ error: "No playlist id provided." }),
      { status: 400 }
    );
  }

  const client = await db;

  const playlist = await client
    .db("p1")
    .collection("Playlist")
    .findOne({
      _id: new ObjectId(playlistId),
    });

  return new NextResponse(JSON.stringify({ playlist }), { status: 200 });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const playlistId = context.params.id;
  console.log("PUT /api/playlists/[id]", playlistId);

  if (!playlistId) {
    return new NextResponse(
      JSON.stringify({ error: "No playlist id provided." }),
      { status: 400 }
    );
  }

  const client = await db;

  const { title, description } = await request.json();

  const playlist = await client
    .db("p1")
    .collection("Playlist")
    .findOneAndUpdate(
      { _id: new ObjectId(playlistId) },
      {
        $set: {
          title,
          description,
        },
      },
      { returnDocument: "after" }
    );

  return new NextResponse(JSON.stringify({ playlist }), { status: 200 });
}
