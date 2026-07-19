import Link from "next/link";


export default function Navbar(){

  return (

    <nav className="
    fixed
    top-0
    z-50
    w-full
    bg-black/90
    backdrop-blur-md
    px-6
    md:px-12
    py-5
    text-white
    ">


      <div className="
      flex
      items-center
      justify-between
      ">


        <Link

          href="/"

          className="
          text-red-600
          text-3xl
          font-black
          "

        >

          NIPFLIX

        </Link>





        <div className="
        flex
        items-center
        gap-4
        md:gap-6
        text-sm
        md:text-base
        ">



          <Link href="/">
            Home
          </Link>



          <Link href="/search">
            Search
          </Link>




          <Link href="/tv-shows">
            TV Shows
          </Link>




          <Link href="/my-list">
            My List
          </Link>




          <Link

            href="/admin"

            className="
            text-red-500
            font-bold
            "

          >

            Admin

          </Link>



        </div>



      </div>



    </nav>

  );

}