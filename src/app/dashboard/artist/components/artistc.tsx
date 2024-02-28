"use client";
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { redirect, useRouter } from 'next/navigation';

interface Artist{
    id: string;
    name: string,
    bio: string,
}

export default function ArtistC({
    id,
    name,
    bio,
}: Artist): JSX.Element {
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

    const onArtistClick = () => {
        router.push(`/dashboard/artists/${id}`);
    };

    return (
        <div
            className="card-compact bg-base-200 max-w-40 shadow-md   max-h-40 relative group cursor-pointer"
            key={name}
            onClick={onArtistClick}
        >
            <div className="card-body">
                <Link href={`/home/artist/${name}`}>
                    <h2 className="card-title">{name}</h2>
                </Link>
                <h1 className='bio'>{bio}</h1>
                <div className="card-actions justify-end">
                    <div className="justify-end card-actions"></div>
                </div>
            </div>
        </div>
    );
}
