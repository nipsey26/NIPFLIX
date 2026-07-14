const movies = [
  {
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6M.jpg",
  },
  {
    title: "Avatar",
    image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  },
  {
    title: "Spider-Man",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
];


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-4xl font-bold text-red-600">
          NIPFLIX
        </h1>

        <div className="flex gap-6">
          <span>Home</span>
          <span>Movies</span>
          <span>TV Shows</span>
          <span>My List</span>
        </div>
      </nav>


      <section className="px-8 py-20">
        <h2 className="text-5xl font-bold">
          Movies. Anytime. Anywhere.
        </h2>

        <button className="mt-8 bg-red-600 px-8 py-3 rounded">
          ▶ Play
        </button>
      </section>


      <section className="px-8">

        <h2 className="text-3xl font-bold mb-5">
          Trending Now
        </h2>


        <div className="flex gap-5 overflow-x-auto">

          {movies.map((movie)=>(
            <div 
              key={movie.title}
              className="min-w-[200px] hover:scale-105 transition"
            >

              <img
                src={movie.image}
                alt={movie.title}
                className="rounded-lg"
              />

              <h3 className="mt-2">
                {movie.title}
              </h3>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}