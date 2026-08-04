"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMoviePage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({

    title:"",
    description:"",
    poster:"",
    backdrop:"",
    videoUrl:"",
    trailerUrl:"",
    category:"",
    year:"",
    teraboxUrl:"",
    available:false,
    featured:false,
    published:true,

  });



  function update(
    key:string,
    value:any
  ){

    setForm(prev=>({
      ...prev,
      [key]:value,
    }));

  }



  async function saveMovie(){

    setLoading(true);
    setMessage("");

    try{


      const res =
      await fetch(
        "/api/admin/movies",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify(form),

        }
      );



      if(res.ok){

        router.push("/admin/movies");
        router.refresh();

      }else{

        setMessage("Failed creating movie");

      }



    }catch{

      setMessage("Error creating movie");

    }


    setLoading(false);

  }





  return (

    <main className="space-y-8">


      <h1 className="text-5xl font-black">
        Add New Movie
      </h1>




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
          onChange={e=>update("title",e.target.value)}
          className="input"
        />


        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e=>update("description",e.target.value)}
          className="input h-40"
        />



        <input
          placeholder="Poster URL"
          value={form.poster}
          onChange={e=>update("poster",e.target.value)}
          className="input"
        />



        <input
          placeholder="Backdrop URL"
          value={form.backdrop}
          onChange={e=>update("backdrop",e.target.value)}
          className="input"
        />



        <input
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={e=>update("videoUrl",e.target.value)}
          className="input"
        />



        <input
          placeholder="TeraBox Link (optional)"
          value={form.teraboxUrl}
          onChange={e=>update("teraboxUrl",e.target.value)}
          className="input"
        />



        <input
          placeholder="Trailer URL"
          value={form.trailerUrl}
          onChange={e=>update("trailerUrl",e.target.value)}
          className="input"
        />



        <div className="grid md:grid-cols-2 gap-5">


          <input
            placeholder="Category"
            value={form.category}
            onChange={e=>update("category",e.target.value)}
            className="input"
          />


          <input
            placeholder="Year"
            value={form.year}
            onChange={e=>update("year",e.target.value)}
            className="input"
          />


        </div>



        <div className="flex gap-6 flex-wrap font-bold">


          <label>
            <input
            type="checkbox"
            checked={form.available}
            onChange={e=>update("available",e.target.checked)}
            />
            {" "}Available
          </label>



          <label>
            <input
            type="checkbox"
            checked={form.featured}
            onChange={e=>update("featured",e.target.checked)}
            />
            {" "}Featured
          </label>



          <label>
            <input
            type="checkbox"
            checked={form.published}
            onChange={e=>update("published",e.target.checked)}
            />
            {" "}Published
          </label>


        </div>



        <button
          onClick={saveMovie}
          disabled={loading}
          className="
          bg-red-600
          rounded-2xl
          px-10
          py-5
          font-black
          text-xl
          "
        >

          {loading ? "Saving..." : "Create Movie"}

        </button>


        {message && (
          <p className="text-red-400 font-bold">
            {message}
          </p>
        )}



      </div>


    </main>

  );

}