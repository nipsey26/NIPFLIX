export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-6">
        <img
          src="/images/logo.png"
          alt="NIPFLIX Logo"
          className="w-40"
        />

        <div className="flex gap-6">
          <span>Home</span>
          <span>Movies</span>
          <span>TV Shows</span>
        </div>
      </nav>

      <section className="p-6">
        <h2 className="text-5xl font-bold">
          Welcome to NIPFLIX
        </h2>

        <p className="mt-4 text-gray-300">
          Unlimited entertainment, anytime.
        </p>
      </section>
    </main>
  );
}