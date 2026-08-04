import { NextResponse } from "next/server";
import { getVideos } from "@/app/lib/bunny";

export async function GET() {
  try {
    const videos = await getVideos();

    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load Bunny Stream videos.",
      },
      {
        status: 500,
      }
    );
  }
}