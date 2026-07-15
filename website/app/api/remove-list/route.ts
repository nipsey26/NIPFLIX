import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { verifySession } from "@/app/lib/auth";


export async function POST(request: Request) {

  try {

    const cookieStore = await cookies();

    const session = cookieStore.get("session")?.value;


    if (!session) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }


    const payload = await verifySession(session);


    if (!payload?.userId) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }


    const { movieId } = await request.json();


    await prisma.myList.deleteMany({
      where: {
        userId: payload.userId as string,
        movieId,
      },
    });


    return NextResponse.json({
      message: "Removed from My List",
    });


  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }

}