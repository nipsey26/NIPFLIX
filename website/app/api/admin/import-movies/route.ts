import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function POST(request: Request) {

  try {


    const body = await request.json();


    const amount =
      Number(body.amount) || 20;



    const apiKey =
      process.env.TMDB_API_KEY;



    if(!apiKey){

      return NextResponse.json(
        {
          error:"Missing TMDB API key"
        },
        {
          status:500
        }
      );

    }





    const response = await fetch(

      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

    );



    const data =
      await response.json();



    const movies =
      data.results.slice(0, amount);





    let imported = 0;





    for(const movie of movies){



      const exists =
        await prisma.movie.findUnique({

          where:{
            tmdbId:String(movie.id)
          }

        });





      if(exists){

        continue;

      }





      await prisma.movie.create({

        data:{


          title:
          movie.title,



          description:
          movie.overview || "",



          poster:
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`,



          backdrop:
          movie.backdrop_path
          ?
          `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          :
          "",



          trailerUrl:null,



          videoUrl:null,



          category:
          "Movie",



          year:
          movie.release_date
          ?
          Number(movie.release_date.slice(0,4))
          :
          null,



          tmdbId:
          String(movie.id),



          sourceType:
          "tmdb",



          available:false,



          published:true,


        }

      });



      imported++;


    }




    return NextResponse.json({

      success:true,

      imported,

    });





  } catch(error){


    console.error(error);


    return NextResponse.json(

      {
        error:"Import failed"
      },

      {
        status:500
      }

    );


  }

}