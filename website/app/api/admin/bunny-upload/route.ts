import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin";
import { prisma } from "@/app/lib/prisma";
import {
  createVideo,
  uploadVideo,
  getVideoDetails,
} from "@/app/lib/bunny";


export async function POST(request: Request) {

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



    const formData =
      await request.formData();



    const title =
      String(formData.get("title") || "");


    const file =
      formData.get("file") as File;



    if (!title || !file) {

      return NextResponse.json(
        {
          error:
          "Title and video file required",
        },
        {
          status:400,
        }
      );

    }



    const bunnyVideo =
      await createVideo(title);



    const videoId =
      bunnyVideo.guid ||
      bunnyVideo.id;



    if(!videoId){

      throw new Error(
        "Bunny video ID missing"
      );

    }



    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      );



    await uploadVideo(
      videoId,
      buffer
    );



    const details =
      await getVideoDetails(
        videoId
      );



    const movie =
      await prisma.movie.create({

        data:{

          title,

          description:"",

          poster:
          "/images/logo.png",


          sourceType:
          "bunny",


          available:true,


          published:true,


          bunnyVideoId:
          videoId,


          bunnyGuid:
          videoId,


          bunnyStatus:
          details.status ?? null,


          bunnyLength:
          details.length ?? null,


          bunnyThumbnail:
          details.thumbnailFileName
          ? `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${videoId}/${details.thumbnailFileName}`
          : null,


          bunnyHlsUrl:
          `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${videoId}/playlist.m3u8`,


          bunnyMp4Url:null,

        }

      });



    return NextResponse.json({

      success:true,

      movie,

      message:
      "Bunny upload complete",

    });



  } catch(error){


    console.error(
      "BUNNY UPLOAD ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:
        "Upload failed",
      },
      {
        status:500,
      }
    );

  }

}