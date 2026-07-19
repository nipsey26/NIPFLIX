import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/app/lib/prisma";



export default async function MovieDetailsPage({

  params,

}: {

  params: Promise<{
    id:string;
  }>;

}) {


  const { id } = await params;



  const movie = await prisma.movie.findUnique({

    where:{
      id,
    },

  });





  const relatedMovies = await prisma.movie.findMany({

    where:{
      category: movie?.category,
      NOT:{
        id,
      },
    },

    take:8,

    orderBy:{
      createdAt:"desc",
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



      <section className="
      relative
      h-[70vh]
      ">


        {movie.poster && (

          <Image

            src={movie.poster}

            alt={movie.title}

            fill

            className="
            object-cover
            "

          />

        )}




        <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black
        via-black/60
        to-transparent
        " />




        <div className="
        absolute
        bottom-10
        left-6
        md:left-12
        max-w-3xl
        ">


          <h1 className="
          text-5xl
          md:text-7xl
          font-black
          ">

            {movie.title}

          </h1>



          <p className="
          mt-4
          text-gray-300
          ">

            {movie.category} • {movie.year}

          </p>



          <p className="
          mt-5
          text-lg
          text-gray-200
          ">

            {movie.description}

          </p>





          <Link

            href={`/player/${movie.id}`}

            className="
            inline-block
            mt-8
            bg-white
            text-black
            px-10
            py-3
            rounded-lg
            font-black
            "

          >

            ▶ Play Movie

          </Link>



        </div>


      </section>









      {relatedMovies.length > 0 && (


        <section className="
        px-6
        md:px-12
        mt-12
        ">


          <h2 className="
          text-3xl
          font-black
          mb-6
          ">

            More Like This

          </h2>




          <div className="
          flex
          gap-5
          overflow-x-auto
          ">


            {relatedMovies.map((item)=>(


              <Link

                key={item.id}

                href={`/movie/${item.id}`}

                className="
                min-w-[180px]
                "

              >


                <Image

                  src={item.poster}

                  alt={item.title}

                  width={180}

                  height={270}

                  className="
                  rounded-xl
                  object-cover
                  "

                />



                <h3 className="
                mt-3
                font-bold
                ">

                  {item.title}

                </h3>


              </Link>


            ))}


          </div>


        </section>


      )}



    </main>

  );

}