import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      userId,
      mediaId,
      mediaType,
      progress,
    } = body;

    if (!userId || !mediaId || !mediaType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const saved = await prisma.watchProgress.upsert({
      where: {
        userId_mediaId_mediaType: {
          userId,
          mediaId,
          mediaType,
        },
      },
      update: {
        progress,
      },
      create: {
        userId,
        mediaId,
        mediaType,
        progress,
      },
    });

    return NextResponse.json(saved);

  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}