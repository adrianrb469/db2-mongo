import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/albums");
  const client = await db;
  const albums = client.db("p1").collection("Album").find({});
  return new NextResponse(JSON.stringify({ albums: await albums.toArray() }), {
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
