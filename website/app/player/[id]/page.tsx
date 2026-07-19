import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import Player from "./Player";



export default async function PlayerPage({

  params,

}: {

  params: Promise<{
    id:string;
  }>;

}) {


  const { id } =
    await params;



  const movie =
    await prisma.movie.findUnique({

      where:{
        id,
      },

    });





  if(!movie){


    return (

      <main className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      ">


        <h1 className="
        text-4xl
        font-black
        ">

        Movie Not Found

        </h1>


      </main>

    );

  }






  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    pb-20
    ">


      <div className="
      p-6
      ">


        <Link

        href="/"

        className="
        text-gray-300
        "

        >

        ← Back

        </Link>


      </div>







      <section className="
      px-6
      ">


        <div className="
        max-w-6xl
        mx-auto
        aspect-video
        bg-black
        rounded-xl
        overflow-hidden
        ">


          <Player

          movie={movie}

          />


        </div>


      </section>








      <section className="
      max-w-6xl
      mx-auto
      px-6
      mt-10
      flex
      flex-col
      md:flex-row
      gap-8
      ">



        <Image

        src={movie.poster}

        alt={movie.title}

        width={240}

        height={360}

        className="
        rounded-xl
        object-cover
        "

        />





        <div>


          <h1 className="
          text-5xl
          font-black
          ">

          {movie.title}

          </h1>



          <p className="
          text-gray-400
          mt-4
          ">

          {movie.category} • {movie.year}

          </p>




          <p className="
          text-gray-300
          mt-6
          text-lg
          ">

          {movie.description}

          </p>




        </div>


      </section>



    </main>

  );

}