"use client";

import { useEffect, useState } from "react";


type Movie = {

  id:string;

  title:string;

  poster:string;

  videoUrl:string;

  category:string;

  year:number;

  featured:boolean;

  published:boolean;

};




export default function AdminPage(){


  const [movies,setMovies] =
    useState<Movie[]>([]);



  const [importTitle,setImportTitle] =
    useState("");



  const [message,setMessage] =
    useState("");



  const [form,setForm] =
    useState({

      title:"",
      poster:"",
      backdrop:"",
      videoUrl:"",
      description:"",
      category:"",
      year:""

    });








  async function loadMovies(){


    const res =
      await fetch(
        "/api/admin/movies"
      );


    const data =
      await res.json();


    setMovies(data);


  }






  useEffect(()=>{

    loadMovies();

  },[]);









  function update(
    field:string,
    value:string
  ){


    setForm({

      ...form,

      [field]:value

    });


  }









  async function importMovie(){


    const res =
      await fetch(

        "/api/admin/import",

        {

          method:"POST",

          headers:{

            "Content-Type":
            "application/json"

          },


          body:JSON.stringify({

            title:importTitle

          })

        }

      );



    const data =
      await res.json();




    if(data.title){


      setForm({

        ...form,

        title:data.title,

        description:data.description,

        poster:data.poster,

        backdrop:data.backdrop,

        year:data.year

      });



      setMessage(
        "Movie information imported!"
      );


    } else {


      setMessage(
        "Movie not found"
      );


    }


  }









  async function addMovie(){


    const res =
      await fetch(

        "/api/admin/movies",

        {

          method:"POST",

          headers:{

            "Content-Type":
            "application/json"

          },


          body:
          JSON.stringify(form)

        }

      );





    if(res.ok){


      setMessage(
        "Movie added!"
      );


      setForm({

        title:"",
        poster:"",
        backdrop:"",
        videoUrl:"",
        description:"",
        category:"",
        year:""

      });


      loadMovies();


    }


  }








  async function deleteMovie(
    id:string
  ){


    await fetch(

      `/api/admin/movies?id=${id}`,

      {

        method:"DELETE"

      }

    );


    loadMovies();


  }









  async function updateMovie(
    movie:Movie,
    type:"featured"|"published"
  ){


    await fetch(

      "/api/admin/movies",

      {

        method:"PATCH",

        headers:{

          "Content-Type":
          "application/json"

        },


        body:JSON.stringify({

          id:movie.id,


          featured:

          type==="featured"

          ? !movie.featured

          : movie.featured,



          published:

          type==="published"

          ? !movie.published

          : movie.published


        })

      }

    );



    loadMovies();


  }









  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    p-6
    md:p-12
    ">


      <h1 className="
      text-5xl
      font-black
      mb-10
      ">

        NIPFLIX ADMIN

      </h1>








      <section className="
      bg-neutral-900
      p-6
      rounded-xl
      max-w-2xl
      mb-10
      ">


        <h2 className="
        text-3xl
        font-black
        mb-5
        ">

          Import Movie

        </h2>



        <input

        placeholder="Movie name"

        value={importTitle}

        onChange={
          e=>setImportTitle(
            e.target.value
          )
        }

        className="
        w-full
        bg-black
        p-3
        rounded-lg
        mb-4
        "

        />



        <button

        onClick={importMovie}

        className="
        bg-blue-600
        px-6
        py-3
        rounded-lg
        font-black
        "

        >

          Import

        </button>


      </section>









      <section className="
      bg-neutral-900
      p-6
      rounded-xl
      max-w-2xl
      mb-12
      ">


      <h2 className="
      text-3xl
      font-black
      mb-5
      ">

      Add Movie

      </h2>





      {[
        ["title","Title"],
        ["poster","Poster URL"],
        ["backdrop","Backdrop URL"],
        ["videoUrl","Video URL"],
        ["category","Category"],
        ["year","Year"]

      ].map(item=>(


        <input

        key={item[0]}

        placeholder={item[1]}

        value={
          form[item[0] as keyof typeof form]
        }


        onChange={
          e=>
          update(
            item[0],
            e.target.value
          )
        }


        className="
        w-full
        bg-black
        p-3
        rounded-lg
        mb-4
        "

        />


      ))}







      <textarea

      placeholder="Description"

      value={form.description}

      onChange={
        e=>
        update(
          "description",
          e.target.value
        )
      }

      className="
      w-full
      bg-black
      p-3
      rounded-lg
      mb-4
      "

      />






      <button

      onClick={addMovie}

      className="
      bg-red-600
      px-8
      py-3
      rounded-lg
      font-black
      "

      >

      Add Movie

      </button>




      <p className="
      text-green-400
      mt-4
      ">

      {message}

      </p>



      </section>









      <section>


      <h2 className="
      text-3xl
      font-black
      mb-6
      ">

      Movie Library

      </h2>





      <div className="
      grid
      md:grid-cols-3
      gap-6
      ">


      {movies.map(movie=>(


        <div

        key={movie.id}

        className="
        bg-neutral-900
        rounded-xl
        overflow-hidden
        p-4
        "

        >


        <img

        src={movie.poster}

        className="
        w-full
        h-80
        object-cover
        rounded-lg
        "

        />



        <h3 className="
        text-xl
        font-black
        mt-4
        ">

        {movie.title}

        </h3>



        <p>

        {movie.published
        ? "🟢 Published"
        : "🔴 Hidden"}

        </p>



        <p>

        {movie.featured
        ? "⭐ Featured"
        : "Normal"}

        </p>




        <div className="
        flex
        gap-2
        flex-wrap
        mt-4
        ">


        <button

        onClick={()=>
          updateMovie(
            movie,
            "featured"
          )
        }

        className="
        bg-yellow-600
        px-3
        py-2
        rounded
        "

        >

        ⭐

        </button>



        <button

        onClick={()=>
          updateMovie(
            movie,
            "published"
          )
        }

        className="
        bg-blue-600
        px-3
        py-2
        rounded
        "

        >

        👁

        </button>




        <button

        onClick={()=>
          deleteMovie(movie.id)
        }

        className="
        bg-red-600
        px-3
        py-2
        rounded
        "

        >

        Delete

        </button>


        </div>


        </div>


      ))}



      </div>


      </section>



    </main>

  );

}