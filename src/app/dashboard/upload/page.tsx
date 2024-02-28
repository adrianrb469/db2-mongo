import SongCard from "../../../components/songs/songcard";
import Newsong from "./components/newsong";

async function getSongs() {
    const response = await fetch("http://localhost:3000/api/song");
    const data = await response.json();
    console.log(data.songs);
    return data.songs;
}

interface song {
    id: string,
    title: string,
    duration: string,
    artists: string[], 
    play_count: number
}

export  default async function Songs() {
    let songs: song[] = await getSongs();
    return (
        <div className="flex flex-col h-full">
            <h1 className="text-3xl p-4 primary">Songs</h1>
            <div className="flex gap-5 flex-wrap justify-center sm:align-start sm:justify-start flex-1 p-3">
                {songs.map((song, index) => (
                    <SongCard
                        id={song._id}
                        title={song.title}
                        duration={song.duration}
                        artists={song.artists}
                        play_count={song.play_count}
                    />
                ))}
            </div>
            <Newsong />
        </div>

    );
}
