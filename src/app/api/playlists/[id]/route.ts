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

  const pipeline = [
    {
      $match: {
        _id: new ObjectId(playlistId),
      },
    },
    {
      $unwind: {
        path: "$songs",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const playlist = await client
    .db("p1")
    .collection("Playlist")
    .aggregate(pipeline)
    .toArray();

  // If the playlist has no songs, return the playlist data directly
  if (playlist.length === 0 || !playlist[0].songs) {
    const playlistData = playlist[0];
    playlistData.songs = [];
    return new NextResponse(JSON.stringify({ playlist: playlistData }), {
      status: 200,
    });
  }

  // Otherwise, continue with lookup and grouping
  pipeline.push(
    {
      $lookup: {
        from: "Song",
        localField: "songs.song_id",
        foreignField: "_id",
        as: "songDetails",
      },
    },
    {
      $group: {
        _id: "$_id",
        id: { $first: "$id" },
        title: { $first: "$title" },
        description: { $first: "$description" },
        image: { $first: "$image" },
        songs: {
          $push: {
            date_added: "$songs.date_added",
            duration: { $arrayElemAt: ["$songDetails.duration", 0] },
            song_id: "$songs.song_id",
            name: { $arrayElemAt: ["$songDetails.title", 0] },
            album: { $arrayElemAt: ["$songDetails.album", 0] },
            artists: { $arrayElemAt: ["$songDetails.artists", 0] },
          },
        },
      },
    }
  );

  const result = await client
    .db("p1")
    .collection("Playlist")
    .aggregate(pipeline)
    .toArray();

  return new NextResponse(JSON.stringify({ playlist: result[0] }), {
    status: 200,
  });
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

  const body = await request.json();

  if (body.songsToRemove) {
    const client = await db;
    // Convert strings to ObjectId instances
    const songsToRemove = body.songsToRemove.map((id) => new ObjectId(id));

    console.log("Removing songs", songsToRemove);

    const playlist = await client
      .db("p1")
      .collection("Playlist")
      .findOneAndUpdate(
        { _id: new ObjectId(playlistId) },
        { $pull: { songs: { song_id: { $in: songsToRemove } } } },
        { returnDocument: "after" }
      );

    return new NextResponse(JSON.stringify({ playlist }), { status: 200 });
  }

  const { title, description } = body;

  if (!title || !description) {
    return new NextResponse(
      JSON.stringify({ error: "Title and description are required." }),
      { status: 400 }
    );
  }

  const client = await db;

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

export async function PATCH(
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

  const playlist = await client
    .db("p1")
    .collection("Playlist")
    .findOneAndUpdate(
      { _id: new ObjectId(playlistId) },
      {
        $push: {
          songs: { song_id: new ObjectId(songId), date_added: new Date() },
        },
      },
      { returnDocument: "after" }
    );

  return new NextResponse(JSON.stringify({ playlist }), { status: 200 });
}
