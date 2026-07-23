import Image from "next/image";
import Link from "next/link";


export default function Hero({
  movie,
}:{
  movie:any;
}){


  if(!movie) return null;


  const background =
    movie.backdrop ||
    movie.poster ||
    "/images/logo.png";



  return (

    <section
      className="
      relative
      h-[75vh]
      md:h-[85vh]
      overflow-hidden
      "
    >


      <Image

        src={background}

        alt={movie.title}

        fill

        priority

        sizes="100vw"

        className="
        object-cover
        "

      />




      <div
        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black
        via-black/60
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
        md:bottom-16
        max-w-3xl
        "
      >



        <p
          className="
          text-red-600
          tracking-[0.6em]
          font-black
          text-sm
          md:text-lg
          mb-5
          "
        >
          NIPFLIX ORIGINAL
        </p>





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
          gap-4
          mt-6
          text-gray-300
          text-lg
          "
        >

          {movie.year && (
            <span>
              {movie.year}
            </span>
          )}


          {movie.category && (
            <span>
              • {movie.category}
            </span>
          )}

        </div>






        <p
          className="
          mt-6
          text-gray-200
          text-lg
          md:text-xl
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
            px-8
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
            backdrop-blur-md
            px-8
            py-4
            rounded-xl
            font-black
            text-lg
            "
          >

            ⓘ More Info

          </Link>




        </div>




      </div>




    </section>

  );

}