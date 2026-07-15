"use client";

import { useState } from "react";

export default function Trailer({ videoKey }: { videoKey: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-black px-8 py-3 rounded"
      >
        ▶ Watch Trailer
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="relative w-[90%] max-w-4xl">

            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Movie Trailer"
              allowFullScreen
            />

          </div>

        </div>
      )}

    </>
  );
}