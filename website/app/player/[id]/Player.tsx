"use client";

import { useEffect, useMemo, useRef } from "react";

export default function Player({
  movie,
}: {
  movie: any;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/api/movies/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movie.id,
      }),
    });
  }, [movie.id]);

  const url = movie.videoUrl || "";

  const player = useMemo(() => {
    if (!url) return null;

    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let id = "";

      try {
        if (url.includes("youtu.be/")) {
          id = url.split("youtu.be/")[1].split("?")[0];
        } else {
          const u = new URL(url);
          id = u.searchParams.get("v") || "";
        }

        return {
          type: "iframe",
          src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
        };
      } catch {
        return null;
      }
    }

    // Bunny Stream
    if (
      url.includes("iframe.mediadelivery.net") ||
      url.includes("bunny")
    ) {
      return {
        type: "iframe",
        src: url,
      };
    }

    // VidKing
    if (url.includes("vidking.net/embed")) {
      return {
        type: "iframe",
        src: url,
      };
    }

    // TeraBox
    if (
      url.includes("terabox") ||
      url.includes("1024tera") ||
      url.includes("terashare")
    ) {
      return {
        type: "iframe",
        src: url,
      };
    }

    // HLS
    if (url.endsWith(".m3u8")) {
      return {
        type: "video",
        src: url,
      };
    }

    // MP4
    return {
      type: "video",
      src: url,
    };
  }, [url]);

  async function saveProgress() {
    const video = videoRef.current;

    if (!video || !video.duration) return;

    await fetch("/api/watch-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "demo-user",
        mediaId: movie.id,
        mediaType: "MOVIE",
        title: movie.title,
        posterPath: movie.poster,
        overview: movie.description,
        progress: video.currentTime / video.duration,
      }),
    });
  }

  if (!player) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold">
          No video available.
        </h2>
      </div>
    );
  }

  if (player.type === "iframe") {
    return (
      <iframe
        src={player.src}
        className="w-full h-full min-h-[500px] rounded-xl"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={player.src}
      controls
      autoPlay
      playsInline
      preload="metadata"
      className="w-full h-full min-h-[500px] rounded-xl bg-black"
      onTimeUpdate={(e) => {
        const video = e.currentTarget;

        if (Math.floor(video.currentTime) % 15 === 0) {
          saveProgress();
        }
      }}
    />
  );
}