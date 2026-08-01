import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";


export async function GET() {

  try {

    const admin = await requireAdmin();

    if ("error" in admin) {
      return NextResponse.json(
        {
          error: admin.error,
        },
        {
          status: admin.status,
        }
      );
    }


    const users = await prisma.user.findMany({

      orderBy: {
        createdAt: "desc",
      },


      include: {
        profiles: true,
        myList: true,
        watchProgress: true,
      },

    });



    return NextResponse.json(users);



  } catch(error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Could not load users",
      },
      {
        status: 500,
      }
    );

  }

}