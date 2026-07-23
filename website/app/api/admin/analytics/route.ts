import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";



export async function GET(){

  try{


    const totalUsers =
      await prisma.user.count();



    const totalMovies =
      await prisma.movie.count();



    const availableMovies =
      await prisma.movie.count({

        where:{
          available:true,
        },

      });




    const featuredMovies =
      await prisma.movie.count({

        where:{
          featured:true,
        },

      });





    const movies =
      await prisma.movie.findMany({

        orderBy:{
          createdAt:"desc",
        },

        take:5,

        select:{

          id:true,

          title:true,

          poster:true,

          createdAt:true,

        },

      });





    const views =
      await prisma.movie.aggregate({

        _sum:{

          views:true,

        },

      });







    return NextResponse.json({

      totalUsers,

      totalMovies,

      availableMovies,

      featuredMovies,

      totalViews:
      views._sum.views || 0,

      recentMovies:
      movies,

    });






  }catch(error){


    console.error(error);



    return NextResponse.json(

      {
        error:"Analytics failed"
      },

      {
        status:500
      }

    );


  }


}