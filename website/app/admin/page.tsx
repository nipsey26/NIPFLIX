import { prisma } from "@/app/lib/prisma";
import AdminImportMovies from "@/app/components/AdminImportMovies";
import Link from "next/link";

export default async function AdminDashboard() {

  const movieCount =
    await prisma.movie.count();


  const userCount =
    await prisma.user.count();


  const featuredCount =
    await prisma.movie.count({
      where:{
        featured:true,
      },
    });


  const availableCount =
    await prisma.movie.count({
      where:{
        available:true,
      },
    });


  const publishedCount =
    await prisma.movie.count({
      where:{
        published:true,
      },
    });


  const views =
    await prisma.movie.aggregate({
      _sum:{
        views:true,
      },
    });


  const latestMovies =
    await prisma.movie.findMany({

      orderBy:{
        createdAt:"desc",
      },

      take:6,

      select:{
        id:true,
        title:true,
        poster:true,
        year:true,
      },

    });



  return (

    <main className="space-y-10">



      <section
        className="
        rounded-3xl
        bg-neutral-950
        border
        border-white/10
        p-10
        "
      >

        <p className="
        text-red-500
        tracking-[0.4em]
        font-black
        ">

          NIPFLIX STUDIO

        </p>


        <h1 className="
        mt-6
        text-6xl
        md:text-7xl
        font-black
        ">

          Welcome Back Admin

        </h1>


        <p className="
        mt-5
        text-gray-400
        text-xl
        ">

          Control your entire streaming platform from one place.

        </p>


      </section>







      <section
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-6
        gap-5
        "
      >

        <Stat
          title="Movies"
          value={movieCount}
          color="bg-red-600"
        />

        <Stat
          title="Users"
          value={userCount}
          color="bg-blue-600"
        />

        <Stat
          title="Views"
          value={views._sum.views || 0}
          color="bg-green-600"
        />

        <Stat
          title="Featured"
          value={featuredCount}
          color="bg-yellow-500 text-black"
        />

        <Stat
          title="Available"
          value={availableCount}
          color="bg-purple-600"
        />

        <Stat
          title="Published"
          value={publishedCount}
          color="bg-neutral-800"
        />

      </section>








      <section
        className="
        rounded-3xl
        bg-neutral-950
        border
        border-white/10
        p-8
        "
      >

        <div className="
        flex
        justify-between
        items-center
        mb-6
        ">

          <h2 className="
          text-3xl
          font-black
          ">
            Recently Added
          </h2>


          <Link
            href="/admin/movies"
            className="
            text-red-500
            font-bold
            "
          >
            View All
          </Link>

        </div>




        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-6
          gap-5
          "
        >

          {latestMovies.map((movie)=>(

            <Link
              href={`/admin/movies/${movie.id}`}
              key={movie.id}
              className="
              bg-neutral-900
              rounded-2xl
              overflow-hidden
              "
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="
                w-full
                h-64
                object-cover
                "
              />


              <div className="p-4">

                <h3 className="
                font-black
                line-clamp-2
                ">
                  {movie.title}
                </h3>


                <p className="text-gray-400 mt-2">
                  {movie.year || "N/A"}
                </p>

              </div>


            </Link>

          ))}


        </div>


      </section>







      <AdminImportMovies />


    </main>

  );

}





function Stat({

  title,
  value,
  color,

}:{

  title:string;
  value:number;
  color:string;

}){


  return (

    <div
      className={`
      rounded-3xl
      p-6
      ${color}
      `}
    >

      <p className="opacity-80 text-sm">
        {title}
      </p>


      <h2 className="
      text-4xl
      font-black
      mt-3
      ">
        {value}
      </h2>


    </div>

  );

}