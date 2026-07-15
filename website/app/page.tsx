import Image from "next/image";
import Link from "next/link";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "./tmdb";

import ContinueWatching from "./components/ContinueWatching";
import { prisma } from "./lib/prisma";
import { getCurrentUser } from "./lib/getUser";


function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: any[];
}) {

  return (
    <section className="px-8 pb-10">

      <h2 className="text-3xl font-bold mb-5">
        {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto">

        {movies.map((movie) => (

          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="min-w-[192px] group"
          >

            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/images/logo.png"
              }
              alt={movie.title || "Movie Poster"}
              width={192}
              height={288}
              className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <h3 className="mt-3 font-bold">
              {movie.title}
            </h3>

            <p className="text-gray-400 text-sm">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>

          </Link>

        ))}

      </div>

    </section>
  );

}



export default async function Home() {

  const user = await getCurrentUser();

  const trending = await getTrendingMovies();
  const popular = await getPopularMovies();
  const topRated = await getTopRatedMovies();
  const nowPlaying = await getNowPlayingMovies();
  const upcoming = await getUpcomingMovies();


  let continueWatching: any[] = [];


  if (user) {

    continueWatching = await prisma.watchProgress.findMany({

      where: {
        userId: user.id,
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 10,

    });

  }


  const featured = trending[0];


  return (

    <main className="min-h-screen bg-black text-white">


      {/* NAVBAR */}

      <nav className="relative z-20 p-6 flex justify-between items-center bg-black">

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="NIPFLIX Logo"
            width={160}
            height={60}
          />
        </Link>


        <div className="flex items-center gap-4">


          {user ? (

            <>
              <span className="font-bold text-lg">
                Welcome, {user.name}
              </span>

              <Link
                href="/profile"
                className="bg-red-600 px-5 py-2 rounded font-bold hover:bg-red-700"
              >
                Profile
              </Link>
            </>

          ) : (

            <Link
              href="/login"
              className="bg-red-600 px-5 py-2 rounded font-bold hover:bg-red-700"
            >
              Login
            </Link>

          )}


        </div>


      </nav>



      {/* HERO */}


      <section className="relative h-[600px]">


        {featured?.backdrop_path && (

          <Image

            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}

            alt={featured.title || "Featured Movie"}

            fill

            priority

            className="object-cover opacity-50"

          />

        )}



        <div className="relative p-8 pt-40 max-w-3xl">


          <h1 className="text-6xl font-bold">

            {featured?.title || "NIPFLIX"}

          </h1>



          <p className="mt-5 text-gray-300 text-lg">

            {featured?.overview ||
              "Unlimited movies and shows anytime, anywhere."}

          </p>



          <div className="mt-8 flex gap-4">


            <Link

              href={`/movie/${featured?.id}`}

              className="bg-white text-black px-8 py-3 rounded font-bold"

            >

              ▶ Play

            </Link>



            <Link

              href={`/movie/${featured?.id}`}

              className="bg-gray-600 px-8 py-3 rounded"

            >

              More Info

            </Link>


          </div>


        </div>


      </section>



      <ContinueWatching items={continueWatching} />



      <MovieRow
        title="Trending Now"
        movies={trending}
      />


      <MovieRow
        title="Popular Movies"
        movies={popular}
      />


      <MovieRow
        title="Top Rated Movies"
        movies={topRated}
      />


      <MovieRow
        title="Now Playing"
        movies={nowPlaying}
      />


      <MovieRow
        title="Upcoming Movies"
        movies={upcoming}
      />


    </main>

  );

}