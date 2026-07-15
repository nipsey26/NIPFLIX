import Image from "next/image";
import Link from "next/link";

import {
  getTVShowDetails,
  getSimilarTVShows,
  getTVShowTrailer,
} from "@/app/tmdb";


export default async function TVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const show = await getTVShowDetails(id);

  const trailer = await getTVShowTrailer(id);

  const similar = await getSimilarTVShows(id);



  return (

    <main className="min-h-screen bg-black text-white p-8">



      {show.backdrop_path && (

        <Image

          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}

          alt={show.name}

          width={1200}

          height={600}

          className="rounded-lg opacity-60"

        />

      )}





      <section className="max-w-3xl mt-8">


        <h1 className="text-5xl font-bold">

          {show.name}

        </h1>




        <p className="mt-5 text-gray-300 text-lg">

          {show.overview}

        </p>




        <p className="mt-4">

          ⭐ Rating: {show.vote_average}

        </p>




        <p>

          📅 First Air Date: {show.first_air_date}

        </p>





        <div className="flex gap-4 mt-6">


          {trailer && (

            <a

              href={`https://www.youtube.com/watch?v=${trailer.key}`}

              target="_blank"

              className="bg-white text-black px-8 py-3 rounded"

            >

              ▶ Watch Trailer

            </a>

          )}




          <button className="bg-gray-600 px-8 py-3 rounded">

            + My List

          </button>



        </div>



      </section>





      <section className="mt-12">


        <h2 className="text-3xl font-bold mb-5">

          More Like This

        </h2>




        <div className="flex gap-5 overflow-x-auto">



          {similar.map((item:any) => (


            <Link

              href={`/tv/${item.id}`}

              key={item.id}

              className="min-w-[192px] group"

            >



              <Image

                src={

                  item.poster_path

                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`

                    : "/images/logo.png"

                }

                alt={item.name}

                width={192}

                height={288}

                className="rounded-lg object-cover group-hover:scale-105 transition"

              />



              <h3 className="mt-3 font-bold">

                {item.name}

              </h3>



            </Link>



          ))}



        </div>



      </section>



    </main>

  );

}