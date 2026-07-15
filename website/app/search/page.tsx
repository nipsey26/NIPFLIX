import Image from "next/image";
import Link from "next/link";
import { searchMovies } from "@/app/tmdb";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {


  const { query } = await searchParams;


  const movies = query
    ? await searchMovies(query)
    : [];



  return (

    <main className="min-h-screen bg-black text-white p-8">


      <h1 className="text-5xl font-bold mb-3">
        Search Results
      </h1>


      {query && (

        <p className="text-gray-400 text-xl mb-8">
          Results for: "{query}"
        </p>

      )}




      {!query && (

        <p className="text-gray-400 text-xl">
          Search for a movie.
        </p>

      )}




      {query && movies.length === 0 && (

        <p className="text-gray-400 text-xl">
          No movies found.
        </p>

      )}




      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">


        {movies.map((movie:any) => (

          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="group"
          >


            <div className="overflow-hidden rounded-lg">


              <Image

                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/images/logo.png"
                }

                alt={movie.title || "Movie Poster"}

                width={200}

                height={300}

                className="rounded-lg object-cover transition duration-300 group-hover:scale-110"

              />


            </div>



            <h2 className="mt-3 font-bold text-lg">
              {movie.title}
            </h2>



            <p className="text-gray-400 text-sm mt-1">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </p>



            <p className="text-gray-400 text-sm">
              📅 {movie.release_date?.slice(0,4) || "Unknown"}
            </p>


          </Link>

        ))}


      </div>


    </main>

  );

}