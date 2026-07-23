import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET(){

  try{


    const settings =
      await prisma.siteSettings.findFirst();



    return NextResponse.json(

      settings || {}

    );



  }catch(error){


    console.error(error);



    return NextResponse.json(

      {
        error:"Could not load settings"
      },

      {
        status:500
      }

    );


  }

}