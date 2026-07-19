"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SearchBar() {

  const [query, setQuery] = useState("");

  const router = useRouter();


  function handleSearch(e: React.FormEvent) {

    e.preventDefault();

    if (!query.trim()) return;

    router.push(
      `/search?query=${encodeURIComponent(query)}`
    );

  }


  return (

    <form
      onSubmit={handleSearch}
      className="
      flex
      items-center
      gap-2
      "
    >

      <input

        type="text"

        value={query}

        onChange={(e)=>setQuery(e.target.value)}

        placeholder="Search movies..."

        className="
        bg-neutral-900
        text-white
        border
        border-gray-700
        rounded-lg
        px-4
        py-2
        w-52
        md:w-72
        outline-none
        "

      />


      <button

        type="submit"

        className="
        bg-red-600
        px-4
        py-2
        rounded-lg
        font-bold
        "

      >

        🔍

      </button>


    </form>

  );

}