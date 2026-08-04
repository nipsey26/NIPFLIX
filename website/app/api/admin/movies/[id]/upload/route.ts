import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";
import {
  createVideo,
  uploadVideo,
  getVideoDetails,
} from "@/app/lib/bunny";


export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

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



    const { id } = await params;



    const movie =
      await prisma.movie.findUnique({
        where:{
          id,
        },
      });



    if(!movie){

      return NextResponse.json(
        {
          error:"Movie not found",
        },
        {
          status:404,
        }
      );

    }




    const formData =
      await request.formData();



    const file =
      formData.get("file") as File;



    if(!file){

      return NextResponse.json(
        {
          error:"No video file received",
        },
        {
          status:400,
        }
      );

    }





    // Create Bunny video entry

    const bunnyVideo =
      await createVideo(
        movie.title
      );





    // Convert iPhone file

    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      );





    // Upload to Bunny

    await uploadVideo(
      bunnyVideo.guid,
      buffer
    );






    // Get Bunny information

    const details =
      await getVideoDetails(
        bunnyVideo.guid
      );







    const updatedMovie =
      await prisma.movie.update({

        where:{
          id,
        },


        data:{


          bunnyVideoId:
          bunnyVideo.guid,


          bunnyGuid:
          bunnyVideo.guid,


          bunnyStatus:
          details.status ?? null,


          bunnyLength:
          details.length ?? null,


          bunnyThumbnail:
          details.thumbnailFileName
          ? `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${bunnyVideo.guid}/${details.thumbnailFileName}`
          : null,



          bunnyPreview:
          details.previewFileName
          ? `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${bunnyVideo.guid}/${details.previewFileName}`
          : null,



          bunnyHlsUrl:
          `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${bunnyVideo.guid}/playlist.m3u8`,



          bunnyMp4Url:
          `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${bunnyVideo.guid}/play_720p.mp4`,



          videoUrl:
          `https://vz-${process.env.BUNNY_STREAM_LIBRARY_ID}.b-cdn.net/${bunnyVideo.guid}/playlist.m3u8`,



          available:true,

        },

      });





    return NextResponse.json(
      {
        success:true,
        movie:updatedMovie,
      }
    );





  } catch(error:any){


    console.error(
      "Bunny upload error:",
      error
    );



    return NextResponse.json(
      {
        error:
        error.message ||
        "Upload failed",
      },
      {
        status:500,
      }
    );


  }

}