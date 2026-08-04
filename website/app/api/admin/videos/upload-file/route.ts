import { NextResponse } from "next/server";
import { uploadVideo } from "@/app/lib/bunny";


export async function POST(
  request:Request
){

  try{


    const formData =
      await request.formData();



    const videoId =
      formData.get("videoId") as string;


    const file =
      formData.get("file") as File;



    if(!videoId || !file){

      return NextResponse.json(
        {
          error:"Missing video or file"
        },
        {
          status:400
        }
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



    return NextResponse.json({

      success:true

    });



  }catch(error){

    console.error(error);


    return NextResponse.json(
      {
        error:"Upload failed"
      },
      {
        status:500
      }
    );

  }

}