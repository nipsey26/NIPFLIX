"use client";

import MovieCard from "./MovieCard";


export default function MovieRow({

  title,

  movies,

}:{

  title:string;

  movies:any[];

}){


  if(!movies || movies.length === 0){
    return null;
  }



  return (

    <section
      className="
      mb-12
      "
    >


      <div
        className="
        px-6
        md:px-12
        mb-5
        flex
        items-center
        justify-between
        "
      >


        <h2
          className="
          text-2xl
          md:text-3xl
          font-black
          "
        >
          {title}
        </h2>


        <span
          className="
          text-gray-400
          text-sm
          font-bold
          hidden
          md:block
          "
        >
          See all →
        </span>


      </div>





      <div
        className="
        flex
        gap-5
        overflow-x-auto
        px-6
        md:px-12
        pb-5
        scrollbar-hide
        "
      >


        {
          movies.map((movie:any)=>(

            <MovieCard

              key={
                movie.id ||
                movie.tmdbId
              }

              movie={movie}

            />

          ))
        }


      </div>



    </section>

  );

}