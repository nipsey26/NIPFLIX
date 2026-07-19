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
        { status:401 }
      );

    }


    const body = await request.json();


    const {
      movieId,
      title,
      posterPath,
      overview
    } = body;


    if(!movieId || !title){

      return NextResponse.json(
        {
          error:"Movie information missing"
        },
        {
          status:400
        }
      );

    }



    const existing = await prisma.myList.findUnique({

      where:{

        userId_mediaId_mediaType:{

          userId:String(payload.userId),

          mediaId:String(movieId),

          mediaType:"movie"

        }

      }

    });



    if(existing){

      return NextResponse.json({

        message:"Already in My List"

      });

    }



    const movie = await prisma.myList.create({

      data:{

        userId:String(payload.userId),

        mediaId:String(movieId),

        mediaType:"movie",

        title,

        posterPath,

        overview

      }

    });



    return NextResponse.json({

      message:"Added to My List",

      movie

    });


  } catch(error:any){

    console.log(error);


    return NextResponse.json(

      {
        error:error.message
      },

      {
        status:500
      }

    );

  }

}