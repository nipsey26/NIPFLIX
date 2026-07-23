"use client";

import Link from "next/link";


type Movie = {
  id:string;
  title:string;
  description?:string | null;
  backdrop?:string | null;
  poster:string;
  year?:number | null;
  category?:string | null;
};



type Settings = {
  siteName?:string | null;
  logo?:string | null;
};



export default function HeroBanner({

  movie,

  settings,

}:{
  movie?:Movie;
  settings?:Settings;
}) {



  if(!movie){

    return (

      <section
        className="
        h-[75vh]
        bg-neutral-950
        flex
        items-center
        justify-center
        "
      >

        <h1
          className="
          text-6xl
          font-black
          text-red-600
          "
        >

          {settings?.siteName || "NIPFLIX"}

        </h1>


      </section>

    );

  }





  return (

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
          movie.poster
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
        via-black/80
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
        top-8
        left-6
        md:left-14
        "
      >

        {
          settings?.logo ?

          <img
            src={settings.logo}
            alt="NIPFLIX"
            className="
            h-12
            md:h-16
            object-contain
            "
          />

          :

          <h2
            className="
            text-red-600
            text-4xl
            md:text-6xl
            font-black
            "
          >

            {settings?.siteName || "NIPFLIX"}

          </h2>
        }


      </div>







      <div
        className="
        absolute
        bottom-20
        left-6
        md:left-14
        max-w-4xl
        "
      >


        <h1
          className="
          text-5xl
          md:text-8xl
          font-black
          leading-none
          "
        >

          {movie.title}

        </h1>




        <div
          className="
          flex
          gap-5
          mt-6
          text-gray-300
          font-bold
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
          text-lg
          md:text-xl
          text-gray-200
          max-w-3xl
          line-clamp-3
          "
        >

          {movie.description}

        </p>






        <div
          className="
          flex
          gap-4
          mt-8
          "
        >


          <Link

            href={`/movie/${movie.id}`}

            className="
            bg-white
            text-black
            px-10
            py-4
            rounded-xl
            font-black
            text-lg
            "
          >

            ▶ Play

          </Link>





          <Link

            href={`/movie/${movie.id}`}

            className="
            bg-white/20
            backdrop-blur
            px-10
            py-4
            rounded-xl
            font-black
            text-lg
            "
          >

            ℹ More Info

          </Link>



        </div>



      </div>


    </section>

  );

}