"use client";
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { redirect, useRouter } from 'next/navigation';

interface SongCard{
    id: string;
    title: string,
    duration: string,
    artists: string[],
    play_count: number
}

export default function SongCard({
    id,
    title,
    duration,
    artists,
    play_count
}: SongCard): JSX.Element {
    const [isSelected, setIsSelected] = useState(false);

    const checkboxClasses = clsx(
        "checkbox",
        "checkbox-primary",
        "absolute",
        "top-0",
        "right-0",
        "z-10",
        {
            "opacity-100": isSelected,
            "opacity-0 group-hover:opacity-100": !isSelected,
        }
    );

    const router = useRouter();

    const onSongClick = () => {
        router.push(`/dashboard/upload/${id}`);
    };

    return (
        <div
            className="card-compact bg-base-200 max-w-40 shadow-md   max-h-40 relative group cursor-pointer"
            key={title}
            onClick={onSongClick}
        >
            <div className="card-body">
                <Link href={`/home/song/${title}`}>
                    <h2 className="card-title">{title}</h2>
                </Link>
                <h1 className='duration'>{duration}seg</h1>
                <h2 className='artistslist'>{artists[0].name}</h2>
                <div className="card-actions justify-end">
                    <div className="justify-end card-actions"></div>
                </div>
            </div>
        </div>
    );
}