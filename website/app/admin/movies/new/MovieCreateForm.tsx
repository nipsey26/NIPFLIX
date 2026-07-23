"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MovieCreateForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({

    title: "",
    description: "",
    poster: "",
    backdrop: "",
    videoUrl: "",
    trailerUrl: "",
    category: "",
    year: "",
    available: false,
    featured: false,
    published: true,

  });



  function update(
    key:string,
    value:any
  ){

    setForm({
      ...form,
      [key]: value,
    });

  }




  async function createMovie(){

    setLoading(true);


    const response = await fetch(
      "/api/admin/movies",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

        body: JSON.stringify(form),

      }
    );



    if(response.ok){

      router.push("/admin/movies");

      router.refresh();

    } else {

      alert("Movie creation failed");

    }


    setLoading(false);

  }




  return (

    <div className="
    bg-neutral-950
    border
    border-white/10
    rounded-3xl
    p-8
    space-y-6
    ">


      <input
        placeholder="Movie title"
        value={form.title}
        onChange={
          e=>update("title",e.target.value)
        }
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <textarea
        placeholder="Description"
        value={form.description}
        onChange={
          e=>update("description",e.target.value)
        }
        className="
        w-full
        h-40
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        placeholder="Poster URL"
        value={form.poster}
        onChange={
          e=>update("poster",e.target.value)
        }
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        placeholder="Backdrop URL"
        value={form.backdrop}
        onChange={
          e=>update("backdrop",e.target.value)
        }
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        placeholder="Video URL"
        value={form.videoUrl}
        onChange={
          e=>update("videoUrl",e.target.value)
        }
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        placeholder="Trailer URL"
        value={form.trailerUrl}
        onChange={
          e=>update("trailerUrl",e.target.value)
        }
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <div className="
      grid
      md:grid-cols-2
      gap-5
      ">


        <input
          placeholder="Category"
          value={form.category}
          onChange={
            e=>update("category",e.target.value)
          }
          className="
          bg-black
          border
          border-white/20
          rounded-xl
          px-5
          py-4
          "
        />


        <input
          placeholder="Year"
          value={form.year}
          onChange={
            e=>update("year",e.target.value)
          }
          className="
          bg-black
          border
          border-white/20
          rounded-xl
          px-5
          py-4
          "
        />


      </div>



      <div className="
      flex
      gap-6
      flex-wrap
      font-bold
      ">


        <label>
          <input
            type="checkbox"
            checked={form.available}
            onChange={
              e=>update("available",e.target.checked)
            }
          />
          {" "}Available
        </label>



        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={
              e=>update("featured",e.target.checked)
            }
          />
          {" "}Featured
        </label>



        <label>
          <input
            type="checkbox"
            checked={form.published}
            onChange={
              e=>update("published",e.target.checked)
            }
          />
          {" "}Published
        </label>


      </div>




      <button
        onClick={createMovie}
        disabled={loading}
        className="
        bg-red-600
        hover:bg-red-700
        px-10
        py-5
        rounded-2xl
        font-black
        text-xl
        "
      >

        {
          loading
          ?
          "Creating..."
          :
          "Create Movie"
        }

      </button>


    </div>

  );

}