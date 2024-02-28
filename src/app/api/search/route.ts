import db from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/search");

  // Parse query parameters
  const title = request.nextUrl.searchParams.get("title") || null;
  const artist = request.nextUrl.searchParams.get("artist") || null;
  const order = request.nextUrl.searchParams.get("order") || "asc";
  const limit = request.nextUrl.searchParams.get("limit") || "10";

  // Create filter object
  const filter: any = {};
  if (title) filter.title = { $regex: new RegExp(title as string, "i") };
  if (artist)
    filter["artists.name"] = { $regex: new RegExp(artist as string, "i") };

  // Determine sort order
  const sortOrder = order === "desc" ? -1 : 1;

  const client = await db;
  const songs = client
    .db("p1")
    .collection("Song")
    .find(filter)
    .sort({ play_count: sortOrder })
    .limit(parseInt(limit as string));

  return new NextResponse(JSON.stringify({ songs: await songs.toArray() }), {
    status: 200,
  });
}
