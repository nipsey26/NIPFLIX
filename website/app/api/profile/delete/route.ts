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

  await prisma.profile.delete({

    where: {

      id: body.id,

    },

  });

  return NextResponse.json({

    success: true,

  });

}