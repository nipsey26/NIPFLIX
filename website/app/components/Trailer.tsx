"use client";

import { useEffect, useState } from "react";


export default function Trailer({
  videoKey,
}: {
  videoKey:string;
}) {


  const [open,setOpen] = useState(false);



  useEffect(()=>{

    if(open){

      document.body.style.overflow = "hidden";

    }else{

      document.body.style.overflow = "auto";

    }


    return ()=>{

      document.body.style.overflow = "auto";

    };


  },[open]);





  return (

    <>


      <button

        onClick={()=>setOpen(true)}

        className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-8
        py-3
        rounded-lg
        font-black
        transition
        shadow-lg
        shadow-red-600/30
        "
      >

        🎬 Watch Trailer

      </button>






      {open && (


        <div

          className="
          fixed
          inset-0
          z-50
          bg-black/90
          backdrop-blur-md
          flex
          items-center
          justify-center
          px-5
          animate-in
          fade-in
          "
          onClick={()=>setOpen(false)}
        >



          <div

            className="
            relative
            w-full
            max-w-5xl
            "
            onClick={(e)=>e.stopPropagation()}
          >




            <button

              onClick={()=>setOpen(false)}

              className="
              absolute
              -top-12
              right-0
              text-white
              text-4xl
              hover:text-red-500
              transition
              "
            >

              ✕

            </button>






            <div
              className="
              rounded-2xl
              overflow-hidden
              shadow-2xl
              border
              border-white/10
              "
            >


              <iframe

                className="
                w-full
                aspect-video
                "
                
                src={
                  `https://www.youtube.com/embed/${videoKey}?autoplay=1`
                }

                title="NIPFLIX Trailer"

                allow="
                autoplay;
                encrypted-media;
                "

                allowFullScreen

              />


            </div>



          </div>



        </div>


      )}


    </>

  );

}