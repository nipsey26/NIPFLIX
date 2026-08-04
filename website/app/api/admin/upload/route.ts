import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/admin";
import { prisma } from "@/app/lib/prisma";
import { createVideo } from "@/app/lib/bunny";

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();

    if ("error" in admin) {
      return NextResponse.json(
        { error: admin.error },
        { status: admin.status }
      );
    }

    const body = await request.json();

    const {
      title,
      poster,
      description,
      year,
      category,
      videoUrl,
    } = body;


    if (!title || !videoUrl) {
      return NextResponse.json(
        {
          error:
            "Title and video link are required.",
        },
        {
          status: 400,
        }
      );
    }


    // Create Bunny video entry
    const bunnyVideo =
      await createVideo(title);



    const movie =
      await prisma.movie.create({

        data: {

          title,

          description:
            description || "",

          poster:
            poster ||
            "/images/logo.png",

          category:
            category || "Movie",

          year:
            year
              ? Number(year)
              : null,


          videoUrl,


          sourceType:
            "bunny-import",


          bunnyVideoId:
            bunnyVideo.guid || bunnyVideo.id,


          published:true,

          available:true,

          featured:false,

        },

      });



    return NextResponse.json({

      success:true,

      movie,

      message:
        "Movie created. Bunny connection ready.",

    });



  } catch(error){

    console.error(
      "UPLOAD ERROR:",
      error
    );


    return NextResponse.json(

      {
        error:
          "Upload failed.",
      },

      {
        status:500,
      }

    );

  }
}