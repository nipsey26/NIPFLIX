import Image from "next/image";
import Link from "next/link";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "./tmdb";


import MovieCard from "./components/MovieCard";


import {
  getPublishedMovies,
  getFeaturedMovies,
  getMoviesByCategory,
} from "./lib/database";





function Row({
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

    <section className="
    px-6
    md:px-12
    mb-12
    ">


      <h2 className="
      text-3xl
      font-black
      mb-6
      ">

        {title}

      </h2>




      <div className="
      flex
      gap-5
      overflow-x-auto
      pb-3
      ">


        {movies.map((movie:any)=>(


          <MovieCard

          key={movie.id}

          movie={movie}

          />


        ))}


      </div>



    </section>

  );

}









export default async function Home(){



  const [

    trending,

    popular,

    topRated,

    nowPlaying,

    upcoming,

    databaseMovies,

    featuredMovies,

    actionMovies,

    horrorMovies,

    comedyMovies,


  ] = await Promise.all([


    getTrendingMovies(),

    getPopularMovies(),

    getTopRatedMovies(),

    getNowPlayingMovies(),

    getUpcomingMovies(),


    getPublishedMovies(),

    getFeaturedMovies(),

    getMoviesByCategory("Action"),

    getMoviesByCategory("Horror"),

    getMoviesByCategory("Comedy"),


  ]);







  const featured =

    featuredMovies.length > 0

    ? featuredMovies[0]

    : trending?.[0];









  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    ">



      {featured && (


        <section className="
        relative
        h-[80vh]
        ">



          <Image


          src={

            featured.backdrop

            ||

            `https://image.tmdb.org/t/p/original${featured.backdrop_path}`

          }


          alt={featured.title}


          fill


          priority


          className="
          object-cover
          "


          />





          <div className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-transparent
          " />







          <div className="
          absolute
          bottom-20
          left-6
          md:left-16
          max-w-2xl
          ">


            <h1 className="
            text-5xl
            md:text-7xl
            font-black
            ">


              {featured.title}


            </h1>





            <p className="
            mt-5
            text-gray-200
            line-clamp-4
            ">


              {featured.description || featured.overview}


            </p>





            <Link

            href={`/player/${featured.id}`}

            className="
            inline-block
            mt-8
            bg-white
            text-black
            px-8
            py-3
            rounded-lg
            font-black
            "

            >

              ▶ Play

            </Link>




          </div>




        </section>


      )}








      <Row

      title="🎬 NIPFLIX Library"

      movies={databaseMovies}

      />





      <Row

      title="⭐ Featured"

      movies={featuredMovies}

      />





      <Row

      title="🔥 Action"

      movies={actionMovies}

      />





      <Row

      title="😂 Comedy"

      movies={comedyMovies}

      />





      <Row

      title="👻 Horror"

      movies={horrorMovies}

      />







      <Row

      title="Trending Now"

      movies={trending}

      />





      <Row

      title="Popular Movies"

      movies={popular}

      />





      <Row

      title="Top Rated"

      movies={topRated}

      />





      <Row

      title="Now Playing"

      movies={nowPlaying}

      />





      <Row

      title="Coming Soon"

      movies={upcoming}

      />




    </main>

  );

}