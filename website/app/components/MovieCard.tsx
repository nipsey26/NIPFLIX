import Image from "next/image";
import Link from "next/link";


export default function MovieCard({
  movie,
}: {
  movie:any;
}) {


  const image = movie.poster_path

    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    : movie.poster;



  return (

    <Link

      href={`/movie/${movie.id}`}

      className="
      min-w-[180px]
      group
      "

    >


      <div className="
      overflow-hidden
      rounded-xl
      bg-neutral-900
      ">


        {image ? (

          <Image

            src={image}

            alt={movie.title}

            width={200}

            height={300}

            className="
            h-[270px]
            w-[180px]
            object-cover
            group-hover:scale-105
            transition
            "

          />

        ) : (

          <div className="
          h-[270px]
          w-[180px]
          bg-neutral-800
          flex
          items-center
          justify-center
          text-gray-400
          ">

            No Poster

          </div>

        )}


      </div>





      <h3 className="
      mt-3
      font-bold
      text-white
      truncate
      ">

        {movie.title}

      </h3>



    </Link>

  );

}