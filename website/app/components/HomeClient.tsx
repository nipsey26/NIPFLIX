"use client";

import { useRouter } from "next/navigation";
import Hero from "./Hero";
import MovieRow from "./MovieRow";
import ContinueWatching from "./ContinueWatching";


export default function HomeClient({

  featured,

  databaseMovies = [],

  featuredMovies = [],

  actionMovies = [],

  comedyMovies = [],

  horrorMovies = [],

  trending = [],

  popular = [],

  topRated = [],

  nowPlaying = [],

  upcoming = [],

  continueWatching = [],


}:any){


  const router = useRouter();



  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      "
    >



      {
        featured && (

          <Hero
            movie={featured}
          />

        )
      }






      <div
        className="
        relative
        z-20
        -mt-10
        "
      >




        <ContinueWatching

          items={continueWatching}

        />







        <MovieRow

          title="🔥 Trending Now"

          movies={trending}

        />






        <MovieRow

          title="🎬 NIPFLIX Library"

          movies={databaseMovies}

        />






        <MovieRow

          title="⭐ Featured"

          movies={featuredMovies}

        />







        {
          actionMovies.length > 0 && (

            <MovieRow

              title="💥 Action"

              movies={actionMovies}

            />

          )
        }







        {
          comedyMovies.length > 0 && (

            <MovieRow

              title="😂 Comedy"

              movies={comedyMovies}

            />

          )
        }







        {
          horrorMovies.length > 0 && (

            <MovieRow

              title="👻 Horror"

              movies={horrorMovies}

            />

          )
        }







        <MovieRow

          title="🔥 Popular"

          movies={popular}

        />







        <MovieRow

          title="🏆 Top Rated"

          movies={topRated}

        />







        <MovieRow

          title="🎥 Now Playing"

          movies={nowPlaying}

        />







        <MovieRow

          title="🚀 Coming Soon"

          movies={upcoming}

        />




      </div>


    </main>

  );

}