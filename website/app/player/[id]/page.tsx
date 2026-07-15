import Link from "next/link";
import {
  getMovieDetails,
  getMovieTrailer,
} from "@/app/tmdb";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(id);
  const trailer = await getMovieTrailer(id);

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex justify-between items-center p-6">

        <Link
          href={`/movie/${id}`}
          className="bg-gray-700 px-5 py-2 rounded"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-bold">
          {movie.title}
        </h1>

      </div>

      <div className="max-w-6xl mx-auto px-6">

        {trailer ? (

          <div className="aspect-video rounded-lg overflow-hidden">

            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={movie.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />

          </div>

        ) : (

          <div className="bg-gray-900 rounded-lg h-[600px] flex items-center justify-center">

            <h2 className="text-3xl">
              No trailer available.
            </h2>

          </div>

        )}

        <div className="mt-8">

          <h2 className="text-4xl font-bold">
            {movie.title}
          </h2>

          <p className="text-gray-400 mt-4">
            {movie.overview}
          </p>

          <p className="mt-6">
            ⭐ {movie.vote_average}
          </p>

          <p>
            📅 {movie.release_date}
          </p>

        </div>

      </div>

    </main>
  );
}