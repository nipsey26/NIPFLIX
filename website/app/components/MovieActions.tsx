"use client";

import Link from "next/link";

export default function MovieActions({
  movieId,
}: {
  movieId: string;
}) {

  return (

    <div className="flex flex-wrap gap-4 py-8">

      <Link
        href={`/player/${movieId}`}
        className="bg-white text-black px-8 py-4 rounded-xl font-black hover:scale-105 transition"
      >
        ▶ Play
      </Link>

      <button
        className="bg-red-600 px-8 py-4 rounded-xl font-black hover:bg-red-700 transition"
      >
        ❤️ My List
      </button>

      <button
        className="bg-neutral-700 px-8 py-4 rounded-xl font-black hover:bg-neutral-600 transition"
      >
        🎞 Trailer
      </button>

    </div>

  );

}