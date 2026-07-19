import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";



export async function POST(
 request:Request
){

 try{


  const body =
    await request.json();



  const {

    userId,

    mediaId,

    title,

    posterPath,

    overview,

    progress,

    mediaType

  } = body;





  const watch =
    await prisma.watchProgress.upsert({

      where:{

        userId_mediaId_mediaType:{

          userId,

          mediaId,

          mediaType

        }

      },


      update:{

        progress

      },


      create:{

        userId,

        mediaId,

        mediaType,

        title,

        posterPath,

        overview,

        progress

      }

    });





  return NextResponse.json(watch);



 }catch(error){


  return NextResponse.json(

    {
      error:"Could not save progress"
    },

    {
      status:500
    }

  );


 }

}