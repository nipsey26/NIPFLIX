"use client";

import { useState } from "react";

export default function AddToList({
  movie,
}: {
  movie: {
    id: number;
    title: string;
    poster_path?: string;
    overview?: string;
  };
}) {

  const [message, setMessage] = useState("");

  async function addMovie() {

    const res = await fetch("/api/my-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movie.id.toString(),
        title: movie.title,
        posterPath: movie.poster_path,
        overview: movie.overview,
      }),
    });


    const data = await res.json();

    setMessage(data.message || data.error);

  }


  return (
    <div>

      <button
        onClick={addMovie}
        className="bg-gray-600 px-8 py-3 rounded"
      >
        + My List
      </button>


      {message && (
        <p className="mt-2 text-sm text-gray-300">
          {message}
        </p>
      )}

    </div>
  );
}