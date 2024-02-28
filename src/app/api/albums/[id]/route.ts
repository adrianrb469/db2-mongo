import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const albumId = context.params.id;

  const client = await db;
  const album = client
    .db("p1")
    .collection("Album")
    .find({ _id: new ObjectId(albumId) });

  const albumData = await album.toArray();

  return new NextResponse(JSON.stringify({ album: albumData[0] }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  console.log("POST /api/albums");
  const client = await db;

  const body = await request.json();

  const newAlbum = {
    ...body,
    songs: [],
  };

  const album = await client.db("p1").collection("Album").insertOne(newAlbum);

  return new NextResponse(JSON.stringify({ album: album.insertedId }), {
    status: 201,
  });
}
