import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {

  const user = await getCurrentUser();

  if (!user) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  }

  const profiles = await prisma.profile.findMany({

    where: {

      userId: user.id,

    },

    orderBy: {

      createdAt: "asc",

    },

  });

  return NextResponse.json(profiles);

}