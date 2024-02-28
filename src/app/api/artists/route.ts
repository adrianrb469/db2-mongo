import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/artist");
  const client = await db;
  const artists = client
    .db("p1")
    .collection("Artist")
    .find({}, { projection: { _id: 1, name: 1, bio: 1} });
  return new NextResponse(
    JSON.stringify({ artists: await artists.toArray() }),
    { status: 200 }
  );
}

export async function POST(req: Request
) {
  console.log("POST /api/artist");
  const client = await db;

  const body = await req.json();

  const newArtist = {
    ...body,
  };

  const artist = await client
    .db("p1")
    .collection("Artist")
    .insertOne(newArtist);

  return new NextResponse(JSON.stringify({ artist: artist.insertedId }), {
    status: 201,
  });
}
