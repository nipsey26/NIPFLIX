"use client";

import { useState } from "react";

export default function AddToList({
  movie,
}: {
  movie: any;
}) {

  const [status, setStatus] = useState("");



  async function addMovie() {


    setStatus("Adding...");


    try {


      const res = await fetch("/api/my-list", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          mediaId: String(movie.id),

          mediaType: "movie",

          title: movie.title,

          posterPath: movie.poster_path || "",

          overview: movie.overview || "",

        }),

      });



      const data = await res.json();



      console.log(
        "MY LIST RESPONSE:",
        data
      );



      if (!res.ok) {


        setStatus(
          data.error || "Failed"
        );


        return;

      }



      setStatus(
        data.message || "Added"
      );



    } catch(error) {


      console.log(
        "ADD TO LIST ERROR:",
        error
      );


      setStatus(
        "Connection error"
      );


    }


  }




  return (

    <div>


      <button

        type="button"

        onClick={addMovie}

        className="
        bg-gray-700
        hover:bg-gray-600
        text-white
        px-8
        py-3
        rounded-lg
        font-bold
        transition
        "

      >

        + My List

      </button>



      {status && (

        <p
          className="
          text-white
          mt-2
          text-sm
          "
        >

          {status}

        </p>

      )}


    </div>

  );

}