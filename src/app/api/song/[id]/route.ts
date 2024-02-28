import db from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const songId = context.params.id

  if (!songId) {
    return new NextResponse(
      JSON.stringify({ error: "No song id provided." }),
      { status: 400 }
    )
  }

  const client = await db

  const pipeline = [
    {
      $match: {
        _id: new ObjectId(songId),
      },
    },
  ]

  const song = await client
    .db("p1")
    .collection("Song")
    .aggregate(pipeline)
    .toArray()

  return new NextResponse(JSON.stringify({ song:song }), {
    status: 200,
  })
}