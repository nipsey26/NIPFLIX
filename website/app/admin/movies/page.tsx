"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  poster: string;
  year: number | null;
  category: string | null;
  available: boolean;
  featured: boolean;
  published: boolean;
};

export default function AdminMoviesPage() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  async function loadMovies(){

    setLoading(true);

    const res = await fetch(
      "/api/admin/movies"
    );

    const data = await res.json();

    setMovies(data);

    setLoading(false);

  }





  useEffect(()=>{

    loadMovies();

  },[]);






  async function deleteMovie(id:string){

    if(!confirm("Delete this movie?")) return;


    await fetch(
      `/api/admin/movies/${id}`,
      {
        method:"DELETE",
      }
    );


    loadMovies();

  }






  const filteredMovies =
    movies.filter(movie =>
      movie.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );







  return (

    <main className="
    space-y-8
    ">


      <div className="
      flex
      flex-col
      md:flex-row
      md:justify-between
      gap-5
      ">


        <div>

          <h1 className="
          text-5xl
          font-black
          ">
            Movie Library
          </h1>


          <p className="
          text-gray-400
          mt-2
          ">
            Manage all NIPFLIX movies.
          </p>


        </div>




        <div className="
        flex
        gap-3
        ">


          <input
            placeholder="Search movies..."
            value={search}
            onChange={
              e=>setSearch(e.target.value)
            }
            className="
            bg-neutral-900
            border
            border-white/10
            rounded-xl
            px-5
            py-4
            w-full
            md:w-80
            "
          />



          <Link
            href="/admin/movies/new"
            className="
            bg-red-600
            rounded-xl
            px-6
            py-4
            font-black
            "
          >
            Add
          </Link>


        </div>


      </div>






      {loading && (

        <p className="text-gray-400">
          Loading movies...
        </p>

      )}







      <div className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-6
      ">



      {filteredMovies.map(movie=>(


        <div
          key={movie.id}
          className="
          bg-neutral-950
          border
          border-white/10
          rounded-3xl
          overflow-hidden
          "
        >


          <img

            src={movie.poster}

            alt={movie.title}

            className="
            w-full
            h-72
            object-cover
            "

          />



          <div className="p-4">


            <h2 className="
            font-black
            line-clamp-2
            ">
              {movie.title}
            </h2>



            <p className="
            text-gray-400
            mt-2
            ">
              {movie.year || "N/A"}
            </p>





            <div className="
            flex
            flex-wrap
            gap-2
            mt-3
            ">


              {movie.available && (

                <span className="
                bg-green-600
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                ">
                  Available
                </span>

              )}



              {movie.featured && (

                <span className="
                bg-yellow-500
                text-black
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                ">
                  Featured
                </span>

              )}



              {movie.published && (

                <span className="
                bg-red-600
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
                ">
                  Published
                </span>

              )}



            </div>





            <div className="
            grid
            grid-cols-2
            gap-2
            mt-5
            ">



              <Link

                href={`/admin/movies/${movie.id}`}

                className="
                bg-white
                text-black
                rounded-xl
                py-2
                text-center
                font-black
                "
              >
                Edit
              </Link>





              <button

                onClick={()=>
                  deleteMovie(movie.id)
                }

                className="
                bg-red-600
                rounded-xl
                font-black
                "
              >
                Delete
              </button>




            </div>


          </div>


        </div>


      ))}


      </div>



    </main>

  );

}