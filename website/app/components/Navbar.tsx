"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Navbar(){

  const router = useRouter();

  const [open,setOpen] = useState(false);
  const [search,setSearch] = useState("");



  function searchMovie(){

    if(!search.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(search)}`
    );

    setSearch("");

  }



  return (

    <header
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      bg-gradient-to-b
      from-black
      via-black/80
      to-transparent
      "
    >

      <div
        className="
        h-20
        px-6
        md:px-12
        flex
        items-center
        justify-between
        gap-6
        "
      >


        <Link
          href="/"
          className="
          text-red-600
          text-4xl
          font-black
          "
        >
          NIPFLIX
        </Link>



        <nav
          className="
          hidden
          md:flex
          gap-8
          font-bold
          "
        >

          <Link href="/">
            Home
          </Link>

          <Link href="/my-list">
            My List
          </Link>

          <Link href="/admin">
            Admin
          </Link>

        </nav>





        <div
          className="
          hidden
          lg:flex
          flex-1
          max-w-md
          "
        >

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") searchMovie();
            }}
            placeholder="Search movies..."
            className="
            w-full
            bg-black/70
            border
            border-white/20
            rounded-xl
            px-5
            py-3
            text-white
            "
          />

        </div>





        <div
          className="
          flex
          items-center
          gap-4
          "
        >

          <div
            className="
            w-11
            h-11
            rounded-md
            bg-red-600
            flex
            items-center
            justify-center
            font-black
            "
          >
            E
          </div>



          <button
            onClick={()=>setOpen(!open)}
            className="
            md:hidden
            bg-red-600
            w-11
            h-11
            rounded-xl
            "
          >
            ☰
          </button>


        </div>


      </div>




      {open && (

        <div
          className="
          mx-5
          bg-black
          border
          border-white/20
          rounded-2xl
          p-6
          space-y-5
          "
        >

          <Link href="/" className="block font-bold">
            Home
          </Link>

          <Link href="/my-list" className="block font-bold">
            My List
          </Link>

          <Link href="/admin" className="block font-bold">
            Admin
          </Link>


          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") searchMovie();
            }}
            placeholder="Search movies..."
            className="
            w-full
            bg-neutral-900
            border
            border-white/20
            rounded-xl
            px-4
            py-3
            "
          />


        </div>

      )}


    </header>

  );

}