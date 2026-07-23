import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";

export async function POST(request: Request) {

  const user = await getCurrentUser();

  if (!user) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  }

  const body = await request.json();

  const profile = await prisma.profile.create({

    data: {

      name: body.name,

      avatar: body.avatar,

      kids: body.kids,

      userId: user.id,

    },

  });

  return NextResponse.json(profile);

}