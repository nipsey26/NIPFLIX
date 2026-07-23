import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET(){

  try{


    const movies =
      await prisma.movie.findMany({

        where:{
          published:true,
        },

        orderBy:{
          createdAt:"desc",
        },

      });



    return NextResponse.json(movies);



  }catch(error){


    return NextResponse.json(

      {
        error:"Could not load movies"
      },

      {
        status:500
      }

    );


  }

}