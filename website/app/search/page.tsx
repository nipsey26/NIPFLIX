import Link from "next/link";
import Image from "next/image";

import {
  searchMovies,
} from "@/app/tmdb";

import {
  getDatabaseMovies,
} from "@/app/lib/database";




export default async function SearchPage({

  searchParams,

}:{

  searchParams:Promise<{
    q?:string;
  }>;

}){


  const {
    q=""
  } =
  await searchParams;




  const localMovies =
   await getDatabaseMovies();





  const tmdbMovies =
    await searchMovies(q);







  const results = [

    ...localMovies.filter(
      (movie:any)=>

      movie.title
      .toLowerCase()
      .includes(
        q.toLowerCase()
      )

    ),


    ...tmdbMovies

  ];







  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    pt-24
    px-6
    md:px-12
    ">



      <h1 className="
      text-4xl
      font-black
      mb-8
      ">

        Search NIPFLIX

      </h1>





      <form>

        <input

          name="q"

          placeholder="Search movies..."

          defaultValue={q}

          className="
          bg-neutral-900
          p-4
          rounded-lg
          w-full
          max-w-xl
          "

        />

      </form>







      <div className="
      grid
      grid-cols-2
      md:grid-cols-5
      gap-6
      mt-10
      ">




        {results.map((movie:any)=>(



          <Link

            key={movie.id}

            href={`/movie/${movie.id}`}

          >




            {movie.poster || movie.poster_path ? (

              <Image

                src={

                  movie.poster ||

                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`

                }

                alt={movie.title}

                width={220}

                height={330}

                className="
                rounded-xl
                "

              />

            ):null}




            <h2 className="
            mt-3
            font-bold
            ">

              {movie.title}

            </h2>



          </Link>


        ))}




      </div>




    </main>

  );

}