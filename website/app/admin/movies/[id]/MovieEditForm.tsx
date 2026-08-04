"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MovieEditForm({
  movie,
}: {
  movie: any;
}) {

  const router = useRouter();

  const [loading,setLoading] = useState(false);
  const [uploading,setUploading] = useState(false);
  const [message,setMessage] = useState("");



  const [form,setForm] = useState({

    title: movie.title || "",

    description: movie.description || "",

    poster: movie.poster || "",

    backdrop: movie.backdrop || "",

    videoUrl: movie.videoUrl || "",

    trailerUrl: movie.trailerUrl || "",

    category: movie.category || "",

    year: movie.year ? String(movie.year) : "",

    available: movie.available,

    featured: movie.featured,

    published: movie.published,

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



  async function uploadMovie(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(!file) return;


    setUploading(true);

    setMessage(
      "Uploading to Bunny Stream..."
    );


    const data =
      new FormData();


    data.append(
      "file",
      file
    );


    try{


      const response =
        await fetch(
          `/api/admin/movies/${movie.id}/upload`,
          {
            method:"POST",
            body:data,
          }
        );



      const result =
        await response.json();



      if(!response.ok){

        throw new Error(
          result.error ||
          "Upload failed"
        );

      }



      setMessage(
        "Bunny Stream upload complete ✅"
      );


      router.refresh();



    }catch(error:any){

      setMessage(
        error.message
      );


    }finally{

      setUploading(false);

    }

  }





  async function save(){

    setLoading(true);


    const response =
      await fetch(
        `/api/admin/movies/${movie.id}`,
        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify(form),

        }
      );



    if(response.ok){

      router.push(
        "/admin/movies"
      );

      router.refresh();

    }else{

      alert(
        "Failed updating movie"
      );

    }


    setLoading(false);

  }




  return (

    <div className="
    space-y-8
    bg-neutral-950
    border border-white/10
    rounded-3xl
    p-8
    ">


      <div className="
      bg-neutral-900
      rounded-3xl
      p-6
      border border-white/10
      ">


        <h2 className="
        text-3xl
        font-black
        ">
          Bunny Stream Upload
        </h2>


        <p className="
        text-gray-400
        mt-2
        ">
          Upload your movie file and stream it through NIPFLIX.
        </p>


        <input
          type="file"
          accept="video/*"
          onChange={uploadMovie}
          disabled={uploading}
          className="
          mt-5
          "
        />


        <p className="
        mt-4
        text-green-400
        font-bold
        ">
          {message}
        </p>


        {movie.bunnyGuid && (

          <p className="text-gray-400 mt-3">

            Bunny ID:
            {" "}
            {movie.bunnyGuid}

          </p>

        )}


      </div>





      <div className="
      bg-neutral-900
      rounded-3xl
      p-6
      border border-white/10
      ">


        <h2 className="
        text-3xl
        font-black
        ">
          Video URL
        </h2>


        <p className="
        text-gray-400
        mt-2
        ">
          YouTube link or direct MP4 link.
        </p>


        <input

          value={form.videoUrl}

          onChange={
            e=>update(
              "videoUrl",
              e.target.value
            )
          }

          placeholder="https://youtu.be/... or movie.mp4"

          className="
          mt-5
          w-full
          bg-black
          border border-white/20
          rounded-xl
          px-5
          py-4
          "

        />


      </div>





      <input
        value={form.title}
        onChange={e=>update("title",e.target.value)}
        placeholder="Movie Title"
        className="
        w-full
        bg-black
        border border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <textarea

        value={form.description}

        onChange={
          e=>update(
            "description",
            e.target.value
          )
        }

        placeholder="Description"

        className="
        w-full
        h-40
        bg-black
        border border-white/20
        rounded-xl
        px-5
        py-4
        "

      />



      <input
        value={form.poster}
        onChange={e=>update("poster",e.target.value)}
        placeholder="Poster URL"
        className="
        w-full
        bg-black
        border border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        value={form.backdrop}
        onChange={e=>update("backdrop",e.target.value)}
        placeholder="Backdrop URL"
        className="
        w-full
        bg-black
        border border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <input
        value={form.trailerUrl}
        onChange={e=>update("trailerUrl",e.target.value)}
        placeholder="Trailer URL"
        className="
        w-full
        bg-black
        border border-white/20
        rounded-xl
        px-5
        py-4
        "
      />



      <button

        onClick={save}

        disabled={loading}

        className="
        bg-red-600
        hover:bg-red-700
        rounded-2xl
        px-10
        py-5
        text-xl
        font-black
        "

      >

        {
          loading
          ? "Saving..."
          : "Save Movie"
        }

      </button>


    </div>

  );

}