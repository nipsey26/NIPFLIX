import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const movie = await prisma.movie.update({
      where: {
        id,
      },

      data: {
        title: body.title,

        description: body.description || "",

        poster: body.poster,

        backdrop: body.backdrop || "",

        videoUrl: body.videoUrl || null,

        trailerUrl: body.trailerUrl || null,

        category: body.category || "",

        year: body.year ? Number(body.year) : null,

        available: Boolean(body.available),

        featured: Boolean(body.featured),

        published: Boolean(body.published),
      },
    });

    return NextResponse.json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error("UPDATE MOVIE ERROR:", error);

    return NextResponse.json(
      {
        error: "Could not update movie",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    await prisma.movie.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE MOVIE ERROR:", error);

    return NextResponse.json(
      {
        error: "Could not delete movie",
      },
      {
        status: 500,
      }
    );
  }
}