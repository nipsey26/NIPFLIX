"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MovieEditForm({
  movie,
}: {
  movie: any;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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
    key: string,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }



  async function save() {

    setLoading(true);

    const response = await fetch(
      `/api/admin/movies/${movie.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );


    if(response.ok){
      router.push("/admin/movies");
      router.refresh();
    }else{
      alert("Failed updating movie");
    }


    setLoading(false);

  }



  return (

    <div className="
    space-y-8
    bg-neutral-950
    border
    border-white/10
    rounded-3xl
    p-8
    ">


      <div className="
      grid
      md:grid-cols-2
      gap-6
      ">

        <div>
          <p className="text-gray-400 mb-3">
            Poster Preview
          </p>

          {form.poster && (
            <img
              src={form.poster}
              alt={form.title}
              className="
              rounded-3xl
              w-full
              h-[500px]
              object-cover
              "
            />
          )}
        </div>


        <div>
          <p className="text-gray-400 mb-3">
            Backdrop Preview
          </p>

          {form.backdrop && (
            <img
              src={form.backdrop}
              alt={form.title}
              className="
              rounded-3xl
              w-full
              h-72
              object-cover
              "
            />
          )}
        </div>

      </div>




      <input
        value={form.title}
        onChange={(e)=>update("title",e.target.value)}
        placeholder="Movie title"
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
        value={form.description}
        onChange={(e)=>update("description",e.target.value)}
        placeholder="Description"
        className="
        w-full
        bg-black
        border
        border-white/20
        rounded-xl
        px-5
        py-4
        h-40
        "
      />



      <input
        value={form.poster}
        onChange={(e)=>update("poster",e.target.value)}
        placeholder="Poster URL"
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
        value={form.backdrop}
        onChange={(e)=>update("backdrop",e.target.value)}
        placeholder="Backdrop URL"
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
          value={form.videoUrl}
          onChange={(e)=>update("videoUrl",e.target.value)}
          placeholder="Video URL"
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
          value={form.trailerUrl}
          onChange={(e)=>update("trailerUrl",e.target.value)}
          placeholder="Trailer URL"
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
      grid
      md:grid-cols-2
      gap-5
      ">

        <input
          value={form.category}
          onChange={(e)=>update("category",e.target.value)}
          placeholder="Category"
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
          value={form.year}
          onChange={(e)=>update("year",e.target.value)}
          placeholder="Year"
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




      <div className="flex gap-6 flex-wrap font-bold">

        <label>
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e)=>update("available",e.target.checked)}
          />
          {" "}Available
        </label>


        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e)=>update("featured",e.target.checked)}
          />
          {" "}Featured
        </label>


        <label>
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e)=>update("published",e.target.checked)}
          />
          {" "}Published
        </label>

      </div>




      <button
        onClick={save}
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
        {loading ? "Saving..." : "Save Movie"}
      </button>


    </div>

  );
}