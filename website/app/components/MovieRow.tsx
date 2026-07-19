import MovieCard from "./MovieCard";


export default function MovieRow({
  title,
  movies,
}: {
  title:string;
  movies:any[];
}) {


  if(!movies || movies.length === 0){
    return null;
  }



  return (

    <section
      className="
      relative
      px-6
      md:px-12
      mb-14
      "
    >



      {/* TITLE */}

      <h2
        className="
        text-2xl
        md:text-3xl
        font-black
        mb-6
        text-white
        "
      >

        {title}

      </h2>





      {/* MOVIE SLIDER */}

      <div
        className="
        relative
        "
      >


        <div
          className="
          flex
          gap-5
          overflow-x-auto
          pb-4
          scrollbar-hide
          scroll-smooth
          "
        >


          {movies.map((movie)=>(

            <MovieCard

              key={movie.id}

              movie={movie}

            />

          ))}


        </div>





        {/* LEFT FADE */}

        <div
          className="
          pointer-events-none
          absolute
          left-0
          top-0
          bottom-0
          w-10
          bg-gradient-to-r
          from-black
          to-transparent
          "
        />




        {/* RIGHT FADE */}

        <div
          className="
          pointer-events-none
          absolute
          right-0
          top-0
          bottom-0
          w-10
          bg-gradient-to-l
          from-black
          to-transparent
          "
        />


      </div>



    </section>

  );

}