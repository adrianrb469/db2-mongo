"use client";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NewSong(){
    const [modalVisible, setModalVisible] = useState(false);
    const [Id,  setID] = useState("");
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [artists, setArtists] = useState("");
    const [playCount, setPlayCount] = useState(0);
    const router = useRouter();
    function onClose() {
        setModalVisible(false);
    }
    useEffect(() => {
        console.log(modalVisible);
    }, [modalVisible]);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const newSong = await fetch("http://localhost:3000/api/song", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Id,
                    title: title,
                    duration: duration,
                    artists: artists,
                    play_count: playCount,
                }),
                cache: "no-store",
            });
            const { song } = await newSong.json();
            console.log(song);
            setModalVisible(false);
            //push id to current route
            router.push(`/dashboard/upload/${song}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return (
        <>
        <button onClick={()=>setModalVisible(true)}>Upload Song</button> 
        <Modal
            title="Upload a new song"
            visible={modalVisible}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="form-control">
                <div> 
                    <label>Id</label>
                    <input
                        type="text"
                        value={Id}
                        onChange={(e) => setID(e.target.value)}
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Duration</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label>Artists</label>
                    <input
                        type="text"
                        value={artists}
                        onChange={(e) => setArtists(e.target.value)}
                    />
                </div>
                <div>
                    <label>Play Count</label>
                    <input
                        type="number"
                        value={playCount}
                        onChange={(e) => setPlayCount(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Modal>
        </>
    )
    };