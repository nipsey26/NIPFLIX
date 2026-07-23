import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET ALL MOVIES
export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load movies" },
      { status: 500 }
    );
  }
}

// CREATE MOVIE
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const movie = await prisma.movie.create({
      data: {
        title: body.title ?? "Untitled Movie",
        description: body.description ?? "",
        poster: body.poster ?? "/images/logo.png",
        backdrop: body.backdrop ?? "",
        videoUrl: body.videoUrl || null,
        trailerUrl: body.trailerUrl || null,
        category: body.category ?? "",
        year: body.year ? Number(body.year) : null,
        tmdbId: body.tmdbId || null,
        sourceType: body.sourceType ?? "manual",
        available: body.available ?? false,
        featured: body.featured ?? false,
        published: body.published ?? true,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}