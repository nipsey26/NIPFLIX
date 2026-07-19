import Image from "next/image";
import Link from "next/link";


export default function Hero({
  movie,
}: {
  movie:any;
}) {


  if(!movie) return null;



  return (

    <section
      className="
      relative
      h-screen
      min-h-[650px]
      overflow-hidden
      "
    >



      {/* BACKGROUND */}

      {movie.backdrop_path && (

        <Image

          src={
            `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          }

          alt={
            movie.title || "NIPFLIX"
          }

          fill

          priority

          sizes="100vw"

          className="
          object-cover
          scale-105
          "

        />

      )}






      {/* DARK CINEMATIC LAYERS */}

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
        via-black/20
        to-transparent
        "
      />






      {/* CONTENT */}

      <div
        className="
        relative
        z-10
        h-full
        flex
        items-end
        px-6
        md:px-12
        pb-28
        "
      >


        <div
          className="
          max-w-3xl
          "
        >




          <p
            className="
            text-red-500
            font-black
            tracking-[5px]
            mb-4
            uppercase
            "
          >
            NIPFLIX ORIGINAL
          </p>





          <h1
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-none
            mb-6
            "
          >

            {movie.title}

          </h1>






          <div
            className="
            flex
            flex-wrap
            gap-3
            mb-6
            "
          >

            <span
              className="
              bg-white/20
              backdrop-blur
              px-4
              py-2
              rounded-full
              "
            >
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </span>


            <span
              className="
              bg-white/20
              backdrop-blur
              px-4
              py-2
              rounded-full
              "
            >
              {movie.release_date?.slice(0,4)}
            </span>


          </div>






          <p
            className="
            text-gray-200
            text-lg
            md:text-xl
            leading-relaxed
            mb-8
            line-clamp-4
            "
          >

            {movie.overview}

          </p>







          <div
            className="
            flex
            gap-4
            flex-wrap
            "
          >



            <Link

              href={`/player/${movie.id}`}

              className="
              bg-white
              text-black
              px-8
              py-3
              rounded-lg
              font-black
              hover:bg-gray-200
              transition
              "
            >

              ▶ Play

            </Link>





            <Link

              href={`/movie/${movie.id}`}

              className="
              bg-white/20
              backdrop-blur
              px-8
              py-3
              rounded-lg
              font-black
              hover:bg-white/30
              transition
              "
            >

              More Info

            </Link>



          </div>





        </div>



      </div>



    </section>

  );

}