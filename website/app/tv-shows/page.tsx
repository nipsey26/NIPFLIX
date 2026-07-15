import Image from "next/image";
import Link from "next/link";

import {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getAiringTodayTVShows,
} from "@/app/tmdb";


function TVRow({
  title,
  shows,
}: {
  title: string;
  shows: any[];
}) {

  return (

    <section className="px-8 pb-10">


      <h2 className="text-3xl font-bold mb-5">
        {title}
      </h2>



      <div className="flex gap-5 overflow-x-auto">


        {shows.map((show:any) => (

          <Link
            href={`/tv/${show.id}`}
            key={show.id}
            className="min-w-[192px] group"
          >


            <Image

              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : "/images/logo.png"
              }

              alt={show.name || "TV Show"}

              width={192}

              height={288}

              className="rounded-lg object-cover transition duration-300 group-hover:scale-105"

            />



            <h3 className="mt-3 font-bold">
              {show.name}
            </h3>



            <p className="text-gray-400 text-sm">
              ⭐ {show.vote_average?.toFixed(1)}
            </p>


          </Link>


        ))}


      </div>


    </section>

  );

}




export default async function TVShowsPage() {


  const trending = await getTrendingTVShows();

  const popular = await getPopularTVShows();

  const topRated = await getTopRatedTVShows();

  const airingToday = await getAiringTodayTVShows();



  return (

    <main className="min-h-screen bg-black text-white p-8">


      <h1 className="text-5xl font-bold mb-10">
        TV Shows
      </h1>



      <TVRow
        title="Trending TV Shows"
        shows={trending}
      />



      <TVRow
        title="Popular TV Shows"
        shows={popular}
      />



      <TVRow
        title="Top Rated TV Shows"
        shows={topRated}
      />



      <TVRow
        title="Airing Today"
        shows={airingToday}
      />


    </main>

  );

}