import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const payload = await verifySession(session);

    if (!payload?.userId) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({
      user,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}