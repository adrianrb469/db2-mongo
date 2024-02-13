import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/playlists");
  const client = await db;
  const playlists = client
    .db("p1")
    .collection("playlists")
    .find({}, { projection: { _id: 0, id: "$_id", title: 1, image: 1 } });
  return new NextResponse(
    JSON.stringify({ playlists: await playlists.toArray() }),
    { status: 200 }
  );
}
