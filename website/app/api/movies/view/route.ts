import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";



export async function POST(
  request: Request
) {

  try {


    const body =
      await request.json();



    const id =
      body.id;



    if(!id){


      return NextResponse.json(

        {
          error:"Movie id missing"
        },

        {
          status:400
        }

      );

    }






    const movie =
      await prisma.movie.update({

        where:{

          id,

        },


        data:{

          views:{

            increment:1

          }

        }


      });







    return NextResponse.json({

      success:true,

      views:movie.views

    });





  } catch(error){


    return NextResponse.json(

      {
        error:"Could not update movie views"
      },

      {
        status:500
      }

    );


  }

}