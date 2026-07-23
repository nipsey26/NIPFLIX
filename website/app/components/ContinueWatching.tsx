"use client";

import Image from "next/image";
import Link from "next/link";


export default function ContinueWatching({

  items = [],

}:{

  items?: any[];

}) {



  if(!items || items.length === 0){

    return null;

  }





  return (

    <section

      className="
      px-6
      md:px-12
      pb-12
      "

    >




      <h2

        className="
        text-2xl
        md:text-3xl
        font-black
        mb-6
        "

      >

        ▶ Continue Watching

      </h2>







      <div

        className="
        flex
        gap-6
        overflow-x-auto
        scrollbar-hide
        "

      >





        {items.map((item:any)=>(


          <Link

            key={item.id}

            href={

              item.mediaType === "tv"

              ?

              `/tv/${item.mediaId}`

              :

              `/movie/${item.mediaId}`

            }

            className="
            min-w-[190px]
            group
            "

          >





            <div

              className="
              relative
              overflow-hidden
              rounded-2xl
              bg-neutral-900
              "

            >



              <Image

                src={

                  item.posterPath

                  ?

                  item.posterPath.startsWith("http")

                    ?

                    item.posterPath

                    :

                    `https://image.tmdb.org/t/p/w500${item.posterPath}`

                  :

                  "/images/logo.png"

                }

                alt={item.title || "NIPFLIX"}

                width={200}

                height={300}

                className="
                h-[280px]
                w-[190px]
                object-cover
                transition
                duration-500
                group-hover:scale-110
                "

              />





              <div

                className="
                absolute
                bottom-0
                left-0
                right-0
                h-2
                bg-white/20
                "

              >


                <div

                  className="
                  h-full
                  bg-red-600
                  "

                  style={{

                    width:`${item.progress || 0}%`

                  }}

                />



              </div>




            </div>







            <h3

              className="
              mt-3
              font-bold
              truncate
              "

            >

              {item.title}

            </h3>





          </Link>


        ))}




      </div>





    </section>


  );

}