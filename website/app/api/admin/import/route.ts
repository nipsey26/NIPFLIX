import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { videoLibrary } from "@/app/lib/video-library";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const amount = Number(body.amount) || 20;

    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Missing TMDB API key",
        },
        {
          status: 500,
        }
      );
    }

    let imported = 0;

    const pages = Math.ceil(amount / 20);

    for (let page = 1; page <= pages; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      for (const movie of data.results) {
        if (imported >= amount) {
          break;
        }

        const exists = await prisma.movie.findUnique({
          where: {
            tmdbId: String(movie.id),
          },
        });

        if (exists) {
          continue;
        }

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`,
          {
            cache: "no-store",
          }
        );

        const videoData = await videoResponse.json();

        const trailer = videoData.results?.find(
          (video: any) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );

        const slot =
          videoLibrary[
            imported % videoLibrary.length
          ];

        await prisma.movie.create({
          data: {
            tmdbId: String(movie.id),

            title: movie.title,

            description:
              movie.overview || "",

            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/images/logo.png",

            backdrop: movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : null,

            videoUrl:
              slot.videoUrl || null,

            trailerUrl:
              trailer
                ? `https://www.youtube.com/watch?v=${trailer.key}`
                : slot.trailerUrl || null,

            category: "Movie",

            year: movie.release_date
              ? Number(movie.release_date.substring(0, 4))
              : null,

            sourceType: "tmdb",

            published: true,

            featured: false,

            available: false,
          },
        });

        imported++;
      }
    }

    return NextResponse.json({
      success: true,
      imported,
    });
  } catch (error) {
    console.error("IMPORT ERROR:", error);

    return NextResponse.json(
      {
        error: "Import failed",
      },
      {
        status: 500,
      }
    );
  }
}