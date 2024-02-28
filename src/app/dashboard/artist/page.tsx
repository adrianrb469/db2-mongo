import ArtistC from "./components/artistc";

async function getArtist(){
    const response = await fetch("http://localhost:3000/api/artists");
    const data = await response.json();
    console.log(data.artists);
    return data.artists;
}

interface artist{
    id: string;
    name: string;
    bio: string;
}
export  default async function Artists() {
    let artists: artist[] = await getArtist();
    return (
        <div className="flex flex-col h-full">
            <h1 className="text-3xl p-4 primary">Artists</h1>
            <div className="flex gap-5 flex-wrap justify-center sm:align-start sm:justify-start flex-1 p-3">
                {artists.map((artist, index) => (
                    <ArtistC
                        id={artist._id}
                        name={artist.name}
                        bio={artist.bio}
                    />
                ))}
            </div>
            
        </div>
    );
}