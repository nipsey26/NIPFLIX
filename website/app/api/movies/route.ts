import { NextResponse } from "next/server";
import { getTrendingMovies } from "@/app/tmdb";

export async function GET() {
  try {
    const movies = await getTrendingMovies();

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load movies." },
      { status: 500 }
    );
  }
}