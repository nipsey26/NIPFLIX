import Link from "next/link";
import Image from "next/image";

import { prisma } from "../lib/prisma";
import { getCurrentUser } from "../lib/getUser";


export default async function MyListPage() {


  const user = await getCurrentUser();



  if (!user) {

    return (

      <main className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      ">

        <div className="text-center">

          <h1 className="
          text-5xl
          font-black
          mb-6
          ">
            My List
          </h1>


          <p className="
          text-gray-400
          mb-8
          ">
            Sign in to save your favorite movies.
          </p>


          <Link
            href="/login"
            className="
            bg-red-600
            px-8
            py-3
            rounded-lg
            font-bold
            "
          >
            Sign In
          </Link>


        </div>


      </main>

    );

  }




  const movies = await prisma.myList.findMany({

    where: {

      userId: user.id,

    },

    orderBy: {

      createdAt: "desc",

    },

  });




  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      px-6
      md:px-12
      py-24
      "
    >


      <h1
        className="
        text-5xl
        font-black
        mb-12
        "
      >
        My List
      </h1>



      {movies.length === 0 ? (


        <div className="
        text-center
        py-24
        ">

          <p className="
          text-gray-400
          text-xl
          ">
            Your list is empty.
          </p>


        </div>



      ) : (


        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-6
          "
        >


          {movies.map((movie:any)=>(


            <Link

              key={movie.id}

              href={`/movie/${movie.mediaId}`}

              className="group"

            >


              <div
                className="
                relative
                aspect-[2/3]
                overflow-hidden
                rounded-xl
                bg-neutral-900
                "
              >


                {movie.posterPath ? (

                  <Image

                    src={
                      `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                    }

                    alt={movie.title}

                    fill

                    className="
                    object-cover
                    group-hover:scale-105
                    transition
                    "

                  />

                ) : (

                  <div className="
                  flex
                  items-center
                  justify-center
                  h-full
                  text-gray-500
                  ">
                    No Image
                  </div>

                )}


              </div>



              <p
                className="
                mt-3
                font-bold
                truncate
                "
              >
                {movie.title}
              </p>



            </Link>


          ))}



        </div>


      )}



    </main>

  );

}