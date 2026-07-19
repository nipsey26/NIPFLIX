"use client";

import { useState } from "react";

export default function VideoPlayer({
  videoUrl,
}: {
  videoUrl: string;
}) {

  const [loading, setLoading] = useState(true);


  if (!videoUrl) {

    return (

      <div
        className="
        aspect-video
        rounded-2xl
        bg-neutral-900
        flex
        items-center
        justify-center
        text-white
        "
      >

        Video unavailable

      </div>

    );

  }



  return (

    <div
      className="
      relative
      aspect-video
      rounded-2xl
      overflow-hidden
      bg-black
      shadow-2xl
      "
    >



      {loading && (

        <div
          className="
          absolute
          inset-0
          z-10
          flex
          items-center
          justify-center
          bg-black
          text-white
          font-bold
          "
        >

          Loading NIPFLIX Player...

        </div>

      )}




      <iframe

        src={videoUrl}

        title="NIPFLIX Player"

        allow="
        autoplay;
        encrypted-media;
        fullscreen;
        "

        allowFullScreen

        className="
        w-full
        h-full
        "

        onLoad={() => setLoading(false)}

      />


    </div>

  );

}