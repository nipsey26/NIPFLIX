"use client";

import { useMemo, useState } from "react";

export default function VideoPlayer({
  videoUrl,
  title,
}: {
  videoUrl?: string | null;
  title: string;
}) {

  const [playing, setPlaying] = useState(false);

  const youtubeEmbed = useMemo(() => {

    if (!videoUrl) return null;

    try {

      if (videoUrl.includes("youtu.be/")) {

        const id =
          videoUrl
            .split("youtu.be/")[1]
            .split("?")[0];

        return `https://www.youtube.com/embed/${id}?autoplay=1`;

      }

      if (videoUrl.includes("youtube.com/watch")) {

        const url = new URL(videoUrl);

        const id = url.searchParams.get("v");

        if (!id) return null;

        return `https://www.youtube.com/embed/${id}?autoplay=1`;

      }

    } catch {

      return null;

    }

    return null;

  }, [videoUrl]);



  if (!videoUrl) {

    return (

      <div
        className="
        bg-neutral-900
        rounded-3xl
        p-10
        text-center
        text-gray-400
        "
      >

        <h2 className="text-2xl font-black text-white mb-3">
          Coming Soon
        </h2>

        <p>
          This movie is not available to watch yet.
        </p>

      </div>

    );

  }



  return (

    <section className="mt-12">

      <h2
        className="
        text-3xl
        font-black
        mb-6
        "
      >
        Watch {title}
      </h2>



      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        bg-black
        shadow-2xl
        "
      >

        {!playing && (

          <button

            onClick={() => setPlaying(true)}

            className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            bg-black/50
            "

          >

            <span
              className="
              w-20
              h-20
              rounded-full
              bg-red-600
              flex
              items-center
              justify-center
              text-3xl
              font-black
              "
            >
              ▶
            </span>

          </button>

        )}



        {playing && youtubeEmbed && (

          <iframe

            src={youtubeEmbed}

            className="w-full aspect-video"

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

            allowFullScreen

          />

        )}



        {playing && !youtubeEmbed && (

          <video

            controls

            autoPlay

            playsInline

            className="w-full aspect-video"

          >

            <source src={videoUrl} />

          </video>

        )}

      </div>

    </section>

  );

}