import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin";
import { createVideo } from "@/app/lib/bunny";

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


    const body = await request.json();


    const {
      title,
      teraboxUrl,
    } = body;



    if (!title || !teraboxUrl) {

      return NextResponse.json(
        {
          error:
          "Title and TeraBox link are required",
        },
        {
          status:400,
        }
      );

    }



    /*
      IMPORTANT:
      TeraBox links are not downloaded directly here.

      The link is saved so the admin workflow
      can later send an authorized video file
      into Bunny Stream.
    */



    const bunnyVideo =
      await createVideo(title);



    return NextResponse.json({

      success:true,

      message:
      "Bunny video slot created. Upload the authorized video file next.",

      bunnyVideo,

      source:{
        provider:"terabox",
        url:teraboxUrl,
      }

    });



  } catch(error){

    console.error(
      "TERABOX IMPORT ERROR",
      error
    );


    return NextResponse.json(
      {
        error:
        "Failed creating Bunny video",
      },
      {
        status:500,
      }
    );

  }
}