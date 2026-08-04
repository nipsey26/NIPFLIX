"use client";

import { useEffect, useState } from "react";

export default function VideoLibraryPage() {

  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);


  async function loadVideos() {

    try {

      const response = await fetch(
        "/api/admin/videos"
      );

      const data = await response.json();


      const list = Array.isArray(data)
        ? data
        : data.items || data.Items || [];


      setVideos(list);

      setConnected(true);


    } catch(error) {

      console.error(error);

      setConnected(false);

    }

  }



  async function createVideo() {

    if(!title) return;


    setLoading(true);


    try {

      await fetch(
        "/api/admin/videos/upload",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({
            title,
          }),

        }
      );


      setTitle("");

      await loadVideos();


    } catch(error){

      console.error(error);

    }


    setLoading(false);

  }





  useEffect(()=>{

    loadVideos();

  },[]);





  return (

    <main className="space-y-10">


      <div>

        <p className="text-red-500 uppercase tracking-[0.4em] font-black">
          NIPFLIX STUDIO
        </p>


        <h1 className="text-6xl font-black mt-4">
          Bunny Stream Library
        </h1>


        <p className="text-gray-400 mt-4 text-xl">
          Manage your real streaming videos.
        </p>

      </div>





      <div className="grid md:grid-cols-4 gap-5">


        <div className="bg-orange-600 rounded-3xl p-6">

          <p>
            Connection
          </p>

          <h2 className="text-4xl font-black mt-3">

            {connected
              ? "Connected"
              : "Offline"}

          </h2>

        </div>



        <div className="bg-blue-600 rounded-3xl p-6">

          <p>
            Videos
          </p>

          <h2 className="text-5xl font-black mt-3">
            {videos.length}
          </h2>

        </div>



        <div className="bg-red-600 rounded-3xl p-6">

          <p>
            Provider
          </p>

          <h2 className="text-3xl font-black mt-4">
            Bunny
          </h2>

        </div>


        <div className="bg-green-600 rounded-3xl p-6">

          <p>
            Status
          </p>

          <h2 className="text-3xl font-black mt-4">
            Ready
          </h2>

        </div>


      </div>






      <div className="bg-neutral-950 border border-white/10 rounded-3xl p-8">


        <h2 className="text-3xl font-black mb-5">
          Create Bunny Video
        </h2>


        <div className="flex gap-4">


          <input

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            placeholder="Movie title"

            className="
            flex-1
            bg-neutral-900
            rounded-xl
            px-5
            py-4
            outline-none
            "

          />



          <button

            onClick={createVideo}

            disabled={loading}

            className="
            bg-red-600
            px-8
            rounded-xl
            font-black
            "

          >

            {loading
              ? "Creating..."
              : "Create Video"}

          </button>


        </div>


      </div>






      <div className="rounded-3xl bg-neutral-950 border border-white/10 overflow-hidden">


        <table className="w-full">


          <thead className="bg-neutral-900">

            <tr>

              <th className="text-left p-5">
                Title
              </th>


              <th className="text-left p-5">
                ID
              </th>


            </tr>

          </thead>



          <tbody>


          {videos.length === 0 && (

            <tr>

              <td
                colSpan={2}
                className="p-10 text-center text-gray-400"
              >
                No Bunny videos yet.
              </td>

            </tr>

          )}



          {videos.map((video:any)=>(


            <tr
              key={video.guid}
              className="border-t border-white/10"
            >

              <td className="p-5">
                {video.title}
              </td>


              <td className="p-5 font-mono">
                {video.guid}
              </td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>


    </main>

  );

}