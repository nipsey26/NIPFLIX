import { NextResponse } from "next/server";
import { createVideo } from "@/app/lib/bunny";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = body.title;

    if (!title) {
      return NextResponse.json(
        {
          error: "Video title is required",
        },
        {
          status: 400,
        }
      );
    }


    const video = await createVideo(title);


    return NextResponse.json({
      success: true,
      video,
    });


  } catch (error) {

    console.error(
      "BUNNY UPLOAD ERROR:",
      error
    );


    return NextResponse.json(
      {
        error: "Could not create Bunny video",
      },
      {
        status:500,
      }
    );

  }
}