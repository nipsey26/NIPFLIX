"use client";

import Image from "next/image";
import Link from "next/link";


export default function MovieCard({
  movie,
}:{
  movie:any;
}){


  const id =
    movie.id ||
    movie.tmdbId;



  if(!id) return null;



  const image =
    movie.poster ||
    movie.poster_path
      ? (
        movie.poster ||
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      )
      : "/images/logo.png";





  return (

    <Link
      href={`/movie/${id}`}
      className="
      group
      min-w-[160px]
      md:min-w-[220px]
      "
    >



      <div
        className="
        overflow-hidden
        rounded-2xl
        bg-neutral-900
        shadow-lg
        "
      >


        <Image

          src={image}

          alt={
            movie.title ||
            "Movie"
          }

          width={300}

          height={450}

          className="
          h-[240px]
          md:h-[330px]
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "

        />


      </div>





      <h3
        className="
        mt-3
        text-white
        font-bold
        text-base
        line-clamp-2
        "
      >

        {movie.title}

      </h3>





      <p
        className="
        text-gray-400
        text-sm
        mt-1
        "
      >

        {movie.year || ""}

      </p>



    </Link>

  );

}