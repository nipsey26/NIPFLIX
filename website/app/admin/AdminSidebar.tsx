"use client";

import { useState } from "react";
import Link from "next/link";


export default function AdminSidebar(){


  const [open,setOpen] = useState(false);



  function closeMenu(){

    setOpen(false);

  }




  const links = [

    {
      name:"Dashboard",
      icon:"▣",
      href:"/admin",
    },

    {
      name:"Movies",
      icon:"▶",
      href:"/admin/movies",
    },

    {
      name:"Users",
      icon:"◉",
      href:"/admin/users",
    },

    {
      name:"Analytics",
      icon:"◈",
      href:"/admin/analytics",
    },

    {
      name:"Settings",
      icon:"⚙",
      href:"/admin/settings",
    },

  ];




  return (

    <div>



      {/* MENU BUTTON */}

      <button

        onClick={()=>setOpen(!open)}

        className="
        bg-red-600
        rounded-xl
        w-14
        h-14
        flex
        items-center
        justify-center
        text-3xl
        font-black
        "

      >

        {open ? "✕" : "☰"}

      </button>






      {/* MENU PANEL */}

      {open && (

        <div

          className="
          fixed
          top-[105px]
          left-0
          w-[300px]
          min-h-screen
          bg-neutral-950
          border-r
          border-white/10
          p-6
          shadow-2xl
          z-50
          "

        >



          <div

            className="
            mb-8
            "

          >


            <p

              className="
              text-red-600
              text-3xl
              font-black
              "

            >

              NIPFLIX

            </p>


            <p

              className="
              text-gray-500
              text-xs
              tracking-[0.3em]
              mt-2
              "

            >

              ADMIN CONTROL CENTER

            </p>


          </div>







          <nav

            className="
            space-y-3
            "

          >

            {links.map((link)=>(


              <Link

                key={link.href}

                href={link.href}

                onClick={closeMenu}

                className="
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                text-gray-300
                hover:bg-red-600
                hover:text-white
                transition
                font-bold
                "

              >

                <span className="text-xl">

                  {link.icon}

                </span>


                {link.name}


              </Link>


            ))}


          </nav>





        </div>

      )}



    </div>

  );

}