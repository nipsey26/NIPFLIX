import Image from "next/image";

async function getMovies() {
  const res = await fetch("http://localhost:3000/api/movies", {
    cache: "no-store",
  });

  const movies = await res.json();

  return movies;
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="flex justify-between items-center p-6">
        <Image
          src="/images/logo.png"
          alt="NIPFLIX Logo"
          width={160}
          height={60}
        />

        <div className="flex gap-6">
          <span>Home</span>
          <span>Movies</span>
          <span>TV Shows</span>
          <span>My List</span>
        </div>
      </nav>


      <section className="p-8 mt-10">
        <h1 className="text-6xl font-bold">
          Unlimited Movies & Shows
        </h1>

        <p className="mt-5 text-gray-300">
          Watch your favorite entertainment anytime, anywhere with NIPFLIX.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-white text-black px-8 py-3 rounded">
            ▶ Play
          </button>

          <button className="bg-gray-600 px-8 py-3 rounded">
            More Info
          </button>
        </div>
      </section>


      <section className="px-8 pb-10">

        <h2 className="text-3xl font-bold mb-5">
          Trending Now
        </h2>


        <div className="flex gap-5 overflow-x-auto">

          {movies.map((movie: any) => (
            <div key={movie.id} className="min-w-48">

              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={192}
                height={288}
                className="rounded-lg object-cover"
              />

              <h3 className="mt-2 font-bold">
                {movie.title}
              </h3>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}