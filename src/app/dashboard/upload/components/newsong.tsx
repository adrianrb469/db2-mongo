"use client";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NewSong(){
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState([]);
    const [duration, setDuration] = useState("");
    const [play_count, setPlay_count] = useState(0);

    const router  = useRouter();

