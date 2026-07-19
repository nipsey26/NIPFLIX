"use client";

import { useEffect } from "react";

export default function TrackWatchProgress({
  movie,
}: {
  movie: any;
}) {


  useEffect(() => {

    if (!movie?.id) return;


    fetch("/api/watch-progress", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        movieId: String(movie.id),

        title: movie.title,

        posterPath: movie.poster_path || "",

        overview: movie.overview || "",

        progress: 0,

      }),

    });


  }, [movie]);



  return null;

}