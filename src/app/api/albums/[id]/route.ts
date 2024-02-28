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

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const albumId = context.params.id;
  console.log("PUT /api/albums/[id]", albumId);

  if (!albumId) {
    return new NextResponse(
      JSON.stringify({ error: "No album id provided." }),
      { status: 400 }
    );
  }

  const body = await request.json();

  if (body.songsToRemove) {
    const client = await db;

    // Convert strings to ObjectId instances
    const songsToRemove = body.songsToRemove.map((id) => new ObjectId(id));

    console.log("Removing songs", songsToRemove);

    const album = await client
      .db("p1")
      .collection("Album")
      .findOneAndUpdate(
        { _id: new ObjectId(albumId) },
        { $pull: { songs: { id_song: { $in: songsToRemove } } } },
        { returnDocument: "after" }
      );

    return new NextResponse(JSON.stringify({ album }), { status: 200 });
  }

  const { title, description } = body;

  if (!title || !description) {
    return new NextResponse(
      JSON.stringify({ error: "Title and description are required." }),
      { status: 400 }
    );
  }

  const client = await db;

  const album = await client
    .db("p1")
    .collection("Album")
    .findOneAndUpdate(
      { _id: new ObjectId(albumId) },
      {
        $set: {
          title,
          description,
        },
      },
      { returnDocument: "after" }
    );

  return new NextResponse(JSON.stringify({ album }), { status: 200 });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const albumId = context.params.id;

  if (!albumId) {
    return new NextResponse(
      JSON.stringify({ error: "No album id provided." }),
      { status: 400 }
    );
  }

  const body = await request.json();
  const songId = body.songId;
  if (!songId) {
    return new NextResponse(JSON.stringify({ error: "No song id provided." }), {
      status: 400,
    });
  }

  const client = await db;

  const song = await client
    .db("p1")
    .collection("Song")
    .findOne({ _id: new ObjectId(songId) });

  if (!song) {
    return new NextResponse(JSON.stringify({ error: "Song not found." }), {
      status: 404,
    });
  }

  const album = await client
    .db("p1")
    .collection("Album")
    .findOneAndUpdate(
      { _id: new ObjectId(albumId) },
      {
        $push: {
          songs: {
            id_song: new ObjectId(songId),
            date_added: new Date(),
            name: song.title,
            duration: song.duration,
            plays: Math.floor(Math.random() * 1000),
            artist: song.artists[0].name,
          },
        },
      },
      { returnDocument: "after" }
    );

  return new NextResponse(JSON.stringify({ album }), { status: 200 });
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
