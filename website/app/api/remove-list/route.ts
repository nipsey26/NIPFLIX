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
        {
          error: "Not logged in",
        },
        {
          status: 401,
        }
      );

    }



    const payload = await verifySession(session);



    if (!payload?.userId) {

      return NextResponse.json(
        {
          error: "Invalid session",
        },
        {
          status: 401,
        }
      );

    }



    const body = await request.json();


    const {
      mediaId,
      mediaType = "movie",
    } = body;



    if (!mediaId) {

      return NextResponse.json(
        {
          error: "Media ID missing",
        },
        {
          status: 400,
        }
      );

    }




    await prisma.myList.deleteMany({

      where: {

        userId: String(payload.userId),

        mediaId: String(mediaId),

        mediaType,

      },

    });




    return NextResponse.json({

      message: "Removed from My List",

    });



  } catch (error:any) {


    console.log(
      "REMOVE LIST ERROR:",
      error
    );



    return NextResponse.json(

      {
        error:
          error.message || "Something went wrong",
      },

      {
        status: 500,
      }

    );


  }

}