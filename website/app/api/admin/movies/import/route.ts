import { NextResponse } from "next/server";


export async function POST(
  request:Request
){

  try {


    const { title } =
      await request.json();



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





    const search =
      await fetch(

        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`

      );



    const data =
      await search.json();




    const movie =
      data.results?.[0];





    if(!movie){

      return NextResponse.json(
        {
          error:"Movie not found"
        },
        {
          status:404
        }
      );

    }






    return NextResponse.json({

      title:
      movie.title,


      description:
      movie.overview,


      poster:
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`,



      backdrop:
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,



      year:
      movie.release_date?.split("-")[0] || "",


    });





  } catch(error){


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