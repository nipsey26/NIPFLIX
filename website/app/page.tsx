export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <img
          src="/images/logo.png"
          alt="NIPFLIX Logo"
          className="w-40"
        />

        <div className="flex gap-6 text-lg">
          <span>Home</span>
          <span>Movies</span>
          <span>TV Shows</span>
          <span>My List</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="p-8 mt-10">
        <h1 className="text-6xl font-bold">
          Unlimited Movies & Shows
        </h1>

        <p className="mt-5 text-xl text-gray-300 max-w-xl">
          Watch your favorite entertainment anytime, anywhere with NIPFLIX.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-white text-black px-8 py-3 rounded font-bold">
            ▶ Play
          </button>

          <button className="bg-gray-600 px-8 py-3 rounded font-bold">
            More Info
          </button>
        </div>
      </section>
{/* Movie Rows */}
<section className="px-8 pb-10">

  <h2 className="text-3xl font-bold mb-5">
    Trending Now
  </h2>

  <div className="flex gap-5 overflow-x-auto">

    <div className="bg-gray-800 rounded-lg w-48 h-72 flex items-center justify-center">
      Movie 1
    </div>

    <div className="bg-gray-800 rounded-lg w-48 h-72 flex items-center justify-center">
      Movie 2
    </div>

    <div className="bg-gray-800 rounded-lg w-48 h-72 flex items-center justify-center">
      Movie 3
    </div>

    <div className="bg-gray-800 rounded-lg w-48 h-72 flex items-center justify-center">
      Movie 4
    </div>

  </div>

</section>
    </main>
  );
}