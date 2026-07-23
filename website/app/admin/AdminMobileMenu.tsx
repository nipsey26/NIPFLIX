"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminMobileMenu() {

  const [open, setOpen] = useState(false);


  const links = [

    {
      name:"Dashboard",
      icon:"📊",
      href:"/admin",
    },

    {
      name:"Movies",
      icon:"🎬",
      href:"/admin/movies",
    },

    {
      name:"TV Shows",
      icon:"📺",
      href:"/admin/tv",
    },

    {
      name:"Video Library",
      icon:"🎥",
      href:"/admin/videos",
    },

    {
      name:"Users",
      icon:"👥",
      href:"/admin/users",
    },

    {
      name:"Subscriptions",
      icon:"💳",
      href:"/admin/subscriptions",
    },

    {
      name:"Revenue",
      icon:"💰",
      href:"/admin/revenue",
    },

    {
      name:"Analytics",
      icon:"📈",
      href:"/admin/analytics",
    },

    {
      name:"Settings",
      icon:"⚙️",
      href:"/admin/settings",
    },

  ];



  return (

    <div className="relative">


      <button

        onClick={()=>setOpen(!open)}

        className="
        bg-red-600
        rounded-2xl
        w-16
        h-16
        md:w-20
        md:h-20
        flex
        items-center
        justify-center
        text-3xl
        font-black
        shadow-xl
        "

      >

        {open ? "✕" : "☰"}

      </button>





      {open && (

        <div

          className="
          absolute
          left-0
          top-24
          w-80
          bg-neutral-950
          border
          border-white/10
          rounded-3xl
          shadow-2xl
          overflow-hidden
          "

        >


          <div

            className="
            bg-red-600
            p-6
            "

          >

            <h2 className="
            text-3xl
            font-black
            ">

              NIPFLIX

            </h2>


            <p className="
            text-sm
            opacity-80
            mt-1
            ">

              Admin Control Center

            </p>


          </div>






          <div className="
          p-4
          space-y-2
          ">


            {links.map((link)=>(


              <Link

                key={link.href}

                href={link.href}

                onClick={()=>setOpen(false)}

                className="
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                hover:bg-red-600
                transition
                font-bold
                text-lg
                "

              >

                <span className="text-2xl">

                  {link.icon}

                </span>


                {link.name}


              </Link>


            ))}


          </div>



        </div>

      )}



    </div>

  );

}