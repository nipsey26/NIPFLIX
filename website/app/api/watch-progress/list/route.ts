import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET(){


 try{


  const movies =
    await prisma.watchProgress.findMany({

      orderBy:{

        updatedAt:"desc"

      },

      take:10

    });



  return NextResponse.json(movies);



 }catch(error){


  return NextResponse.json(

    {
      error:"Could not load history"
    },

    {
      status:500
    }

  );


 }


}