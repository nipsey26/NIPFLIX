import Image from "next/image";
import Link from "next/link";

import {
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
} from "@/app/tmdb";

import AddToList from "@/app/components/AddToList";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(id);
  const trailer = await getMovieTrailer(id);
  const similar = await getSimilarMovies(id);

  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="p-6">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="NIPFLIX Logo"
            width={160}
            height={60}
          />
        </Link>
      </nav>

      <section className="p-8">

        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={1200}
            height={600}
            className="rounded-lg opacity-60"
          />
        )}

        <div className="max-w-3xl mt-8">

          <h1 className="text-5xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-5 text-gray-300 text-lg">
            {movie.overview}
          </p>

          <p className="mt-4">
            ⭐ Rating: {movie.vote_average?.toFixed(1)}
          </p>

          <p>
            📅 Release Date: {movie.release_date}
          </p>

          <div className="flex gap-4 mt-6 flex-wrap">

            <Link
              href={`/player/${movie.id}`}
              className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
            >
              ▶ Play
            </Link>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 px-8 py-3 rounded hover:bg-gray-600 transition"
              >
                🎬 Watch Trailer
              </a>
            )}

            <AddToList movie={movie} />

          </div>

        </div>

      </section>

      <section className="px-8 pb-10">

        <h2 className="text-3xl font-bold mb-5">
          More Like This
        </h2>

        <div className="flex gap-5 overflow-x-auto">

          {similar.map((movie: any) => (

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
                alt={movie.title}
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

    </main>
  );
}