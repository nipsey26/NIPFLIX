"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({
  user,
}: {
  user: { name: string } | null;
}) {

  const router = useRouter();

  const [query, setQuery] = useState("");



  async function logout() {

    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();

  }



  function searchMovie(e: React.FormEvent) {

    e.preventDefault();

    if (!query.trim()) {

      alert("Please type a movie name first");

      return;

    }


    router.push(
      `/search?query=${encodeURIComponent(query.trim())}`
    );

  }



  return (

    <nav className="
      flex
      justify-between
      items-center
      p-6
      absolute
      top-0
      left-0
      right-0
      z-50
      bg-transparent
    ">


      {/* LOGO */}

      <Link href="/">

        <Image

          src="/images/logo.png"

          alt="NIPFLIX Logo"

          width={160}

          height={60}

        />

      </Link>




      <div className="flex gap-6 items-center text-white">


        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>



        <Link href="/" className="hover:text-gray-300">
          Movies
        </Link>



        <Link href="/tv-shows" className="hover:text-gray-300">
          TV Shows
        </Link>



        <Link href="/my-list" className="hover:text-gray-300">
          My List
        </Link>





        <form
          onSubmit={searchMovie}
          className="flex gap-2"
        >

          <input

            value={query}

            onChange={(e) => setQuery(e.target.value)}

            placeholder="Search movies..."

            className="
              px-3
              py-2
              rounded
              text-black
              bg-white
              w-44
            "

          />



          <button

            type="submit"

            className="
              bg-white
              text-black
              px-3
              py-2
              rounded
            "

          >

            🔎

          </button>


        </form>





        {user ? (

          <>

            <span className="
              bg-gray-700
              px-4
              py-2
              rounded
              font-bold
            ">

              Welcome, {user.name}

            </span>



            <button

              onClick={logout}

              className="
                bg-red-600
                hover:bg-red-700
                px-4
                py-2
                rounded
                font-bold
              "

            >

              Logout

            </button>


          </>


        ) : (

          <>

            <Link

              href="/login"

              className="
                bg-gray-700
                px-4
                py-2
                rounded
              "

            >

              Login

            </Link>



            <Link

              href="/signup"

              className="
                bg-red-600
                px-4
                py-2
                rounded
                font-bold
              "

            >

              Sign Up

            </Link>


          </>

        )}



      </div>


    </nav>

  );

}