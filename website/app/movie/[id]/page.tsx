import { prisma } from "@/app/lib/prisma";
import Link from "next/link";


export default async function MoviePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;



  const movie = await prisma.movie.findFirst({

    where: {

      OR: [

        {
          id,
        },

        {
          tmdbId:id,
        },

      ],

    },

  });






  if(!movie){

    return (

      <main
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >

        <h1 className="text-4xl font-black">
          Movie Not Found
        </h1>

      </main>

    );

  }







  const suggestions = await prisma.movie.findMany({

    where: {

      published:true,

      category: movie.category
        ? movie.category
        : undefined,

      NOT: {

        id: movie.id,

      },

    },

    take:12,

    orderBy:{

      createdAt:"desc",

    },

  });






  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      "
    >





      <section
        className="
        relative
        h-[85vh]
        overflow-hidden
        "
      >



        <img

          src={
            movie.backdrop ||
            movie.poster ||
            "/images/logo.png"
          }

          alt={movie.title}

          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          "

        />





        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-transparent
          "
        />



        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-transparent
          "
        />







        <div
          className="
          absolute
          bottom-20
          left-6
          md:left-12
          max-w-4xl
          "
        >



          <h1
            className="
            text-5xl
            md:text-8xl
            font-black
            "
          >

            {movie.title}

          </h1>






          <div
            className="
            flex
            gap-5
            mt-5
            text-gray-300
            "
          >

            {
              movie.year && (

                <span>
                  {movie.year}
                </span>

              )
            }


            {
              movie.category && (

                <span>
                  {movie.category}
                </span>

              )
            }


          </div>







          <p
            className="
            mt-6
            text-gray-200
            text-lg
            md:text-xl
            max-w-3xl
            "
          >

            {movie.description}

          </p>








          <div
            className="
            flex
            gap-5
            mt-8
            "
          >




            {
              movie.videoUrl ? (

                <Link

                  href={`/player/${movie.id}`}

                  className="
                  bg-white
                  text-black
                  px-10
                  py-5
                  rounded-xl
                  font-black
                  text-xl
                  "
                >

                  ▶ Play

                </Link>

              ) : (

<Link

href={`/player/${movie.id}`}

className="
bg-white
text-black
px-10
py-5
rounded-xl
font-black
text-xl
flex
items-center
gap-3
"

>

▶ Play

</Link>

              )

            }








            {
              movie.trailerUrl && (

                <a

                  href={movie.trailerUrl}

                  target="_blank"

                  className="
                  bg-white/20
                  backdrop-blur
                  px-10
                  py-5
                  rounded-xl
                  font-black
                  text-xl
                  "
                >

                  Trailer

                </a>

              )
            }





          </div>





        </div>





      </section>









      <section
        className="
        px-6
        md:px-12
        py-16
        "
      >





        <h2
          className="
          text-3xl
          font-black
          mb-8
          "
        >

          More Like This

        </h2>






        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-6
          "
        >


          {
            suggestions.map((item)=>(


              <Link

                key={item.id}

                href={`/movie/${item.id}`}

              >


                <img

                  src={item.poster}

                  alt={item.title}

                  className="
                  rounded-2xl
                  h-72
                  w-full
                  object-cover
                  hover:scale-105
                  transition
                  "

                />


                <h3
                  className="
                  mt-3
                  font-bold
                  "
                >

                  {item.title}

                </h3>


              </Link>


            ))
          }



        </div>




      </section>





    </main>

  );

}