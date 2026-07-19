import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";



// GET MOVIES

export async function GET() {

  try {

    const movies = await prisma.movie.findMany({

      orderBy: {
        createdAt: "desc",
      },

    });


    return NextResponse.json(movies);


  } catch(error) {


    return NextResponse.json(

      {
        error:"Could not load movies",
      },

      {
        status:500,
      }

    );

  }

}






// ADD MOVIE

export async function POST(
  request:Request
) {

  try {


    const body =
      await request.json();



    const movie =
      await prisma.movie.create({

        data: {

          title:
          body.title,


          description:
          body.description || "",



          poster:
          body.poster,



          backdrop:
          body.backdrop || "",



          videoUrl:
          body.videoUrl,



          category:
          body.category || "Other",



          year:
          Number(body.year) || null,



          sourceType:
          body.sourceType || "upload",



          featured:
          body.featured || false,



          published:
          body.published ?? true,


        },

      });





    return NextResponse.json({

      success:true,

      movie,

    });




  } catch(error) {


    return NextResponse.json(

      {
        error:"Could not add movie",
      },

      {
        status:500,
      }

    );

  }

}









// UPDATE MOVIE SETTINGS

export async function PATCH(
  request:Request
) {


  try {


    const body =
      await request.json();



    const movie =
      await prisma.movie.update({

        where:{
          id:body.id,
        },


        data:{

          featured:
          body.featured,


          published:
          body.published,

        },


      });




    return NextResponse.json({

      success:true,

      movie,

    });




  } catch(error) {


    return NextResponse.json(

      {
        error:"Could not update movie",
      },

      {
        status:500,
      }

    );


  }

}









// DELETE MOVIE

export async function DELETE(
  request:Request
) {


  try {


    const { searchParams } =
      new URL(request.url);



    const id =
      searchParams.get("id");



    if(!id){

      return NextResponse.json(

        {
          error:"Missing movie id",
        },

        {
          status:400,
        }

      );

    }




    await prisma.movie.delete({

      where:{
        id,
      },

    });





    return NextResponse.json({

      success:true,

    });





  } catch(error) {


    return NextResponse.json(

      {
        error:"Could not delete movie",
      },

      {
        status:500,
      }

    );


  }

}