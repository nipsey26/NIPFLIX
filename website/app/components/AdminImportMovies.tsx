"use client";

import { useState } from "react";

export default function AdminImportMovies() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const [message, setMessage] = useState("");

  async function importMovies() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/admin/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Import failed.");
        return;
      }

      setMessage(`✅ Successfully imported ${data.imported} movies.`);

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch {
      setMessage("Import failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
      mt-10
      rounded-3xl
      bg-neutral-950
      border
      border-white/10
      p-10
      "
    >

      <div className="flex justify-between items-center flex-wrap gap-5">

        <div>

          <p className="text-red-500 uppercase tracking-[0.4em] font-black">
            Content Studio
          </p>

          <h2 className="text-4xl font-black mt-3">
            Import Movies
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl">
            Import thousands of movies directly from TMDB into your NIPFLIX
            library. Every movie is automatically prepared for trailers,
            playback and future Bunny Stream integration.
          </p>

        </div>

        <div
          className="
          bg-neutral-900
          rounded-2xl
          border
          border-white/10
          px-8
          py-6
          "
        >

          <p className="text-gray-400">
            Video Library
          </p>

          <h3 className="text-5xl font-black mt-2">
            3000
          </h3>

          <p className="text-green-400 font-bold mt-2">
            Slots Ready
          </p>

        </div>

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-5
        mt-10
        "
      >

        <div className="rounded-2xl bg-neutral-900 p-6">

          <p className="text-gray-400">
            Import Amount
          </p>

          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="
            mt-4
            w-full
            bg-black
            border
            border-white/10
            rounded-xl
            px-5
            py-4
            "
          >
            <option value={20}>20 Movies</option>
            <option value={50}>50 Movies</option>
            <option value={100}>100 Movies</option>
            <option value={250}>250 Movies</option>
            <option value={500}>500 Movies</option>
          </select>

        </div>

        <div className="rounded-2xl bg-neutral-900 p-6">

          <p className="text-gray-400">
            Movie Provider
          </p>

          <h2 className="text-3xl font-black mt-5">
            TMDB
          </h2>

          <p className="text-green-400 mt-2">
            Connected
          </p>

        </div>

        <div className="rounded-2xl bg-neutral-900 p-6">

          <p className="text-gray-400">
            Future Streaming
          </p>

          <h2 className="text-3xl font-black mt-5">
            Bunny Stream
          </h2>

          <p className="text-yellow-400 mt-2">
            Ready
          </p>

        </div>

      </div>

      <button
        onClick={importMovies}
        disabled={loading}
        className="
        mt-10
        w-full
        bg-red-600
        hover:bg-red-700
        transition
        rounded-2xl
        py-5
        text-xl
        font-black
        disabled:opacity-50
        "
      >
        {loading ? "Importing Movies..." : "Import Movies Into NIPFLIX"}
      </button>

      {message && (
        <div
          className="
          mt-8
          rounded-2xl
          bg-green-600/20
          border
          border-green-500
          p-5
          text-green-400
          font-bold
          "
        >
          {message}
        </div>
      )}

    </section>
  );
}