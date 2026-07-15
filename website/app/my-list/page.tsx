import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { verifySession } from "@/app/lib/auth";
import RemoveFromList from "@/app/components/RemoveFromList";


export default async function MyListPage() {

  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;


  if (!session) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold">
          Please login to view My List
        </h1>
      </main>
    );
  }


  const payload = await verifySession(session);


  if (!payload?.userId) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold">
          Invalid session
        </h1>
      </main>
    );
  }


  const movies = await prisma.myList.findMany({
    where: {
      userId: payload.userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });



  return (

    <main className="min-h-screen bg-black text-white p-8">


      <h1 className="text-5xl font-bold mb-10">
        My List
      </h1>



      {movies.length === 0 ? (

        <p className="text-gray-400 text-xl">
          Your list is empty.
        </p>

      ) : (


        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">


          {movies.map((movie) => (

            <div
              key={movie.id}
              className="group"
            >


              <Link
                href={`/movie/${movie.movieId}`}
              >


                <Image
                  src={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : "/images/logo.png"
                  }
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg object-cover group-hover:scale-105 transition"
                />


                <h2 className="mt-3 font-bold">
                  {movie.title}
                </h2>


              </Link>


              <RemoveFromList movieId={movie.movieId} />


            </div>

          ))}


        </div>

      )}


    </main>

  );
}