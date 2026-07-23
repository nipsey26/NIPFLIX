"use client";

import { useEffect, useState } from "react";

type Analytics = {

  totalUsers:number;

  totalMovies:number;

  availableMovies:number;

  featuredMovies:number;

  totalViews:number;

  recentMovies:any[];

};



export default function AnalyticsPage(){


  const [data,setData] =
    useState<Analytics | null>(null);


  const [loading,setLoading] =
    useState(true);





  async function loadAnalytics(){


    const response =
      await fetch(
        "/api/admin/analytics"
      );


    const result =
      await response.json();


    setData(result);


    setLoading(false);


  }





  useEffect(()=>{

    loadAnalytics();

  },[]);







  if(loading){


    return (

      <main className="
      min-h-screen
      flex
      items-center
      justify-center
      text-3xl
      font-black
      ">

        Loading Analytics...

      </main>

    );

  }







  return (

    <main className="space-y-10">





      <section

        className="
        bg-neutral-950
        border
        border-white/10
        rounded-3xl
        p-10
        "

      >

        <p className="
        text-red-500
        tracking-[0.4em]
        font-black
        ">

          NIPFLIX INSIGHTS

        </p>


        <h1 className="
        text-6xl
        font-black
        mt-5
        ">

          Analytics Center

        </h1>


        <p className="
        text-gray-400
        text-xl
        mt-4
        ">

          Monitor performance, viewers and content growth.

        </p>


      </section>








      <section

        className="
        grid
        grid-cols-2
        md:grid-cols-5
        gap-5
        "

      >


        <Card
          title="Users"
          value={data?.totalUsers || 0}
          color="bg-blue-600"
        />


        <Card
          title="Movies"
          value={data?.totalMovies || 0}
          color="bg-red-600"
        />


        <Card
          title="Available"
          value={data?.availableMovies || 0}
          color="bg-green-600"
        />


        <Card
          title="Featured"
          value={data?.featuredMovies || 0}
          color="bg-yellow-500 text-black"
        />


        <Card
          title="Views"
          value={data?.totalViews || 0}
          color="bg-purple-600"
        />


      </section>









      <section

        className="
        bg-neutral-950
        border
        border-white/10
        rounded-3xl
        p-8
        "

      >

        <div className="
        flex
        justify-between
        items-center
        ">


          <h2 className="
          text-3xl
          font-black
          ">

            Trending Content

          </h2>


          <span className="
          text-red-500
          font-bold
          ">

            LIVE

          </span>


        </div>






        <div

          className="
          grid
          md:grid-cols-5
          gap-6
          mt-8
          "

        >

          {
            data?.recentMovies.map(movie=>(

              <div

                key={movie.id}

                className="
                bg-black
                rounded-3xl
                overflow-hidden
                border
                border-white/10
                "

              >


                <img

                  src={movie.poster}

                  alt={movie.title}

                  className="
                  w-full
                  h-72
                  object-cover
                  "

                />



                <div className="p-4">


                  <h3 className="
                  font-black
                  line-clamp-2
                  ">

                    {movie.title}

                  </h3>


                </div>



              </div>

            ))
          }


        </div>


      </section>








      <section

        className="
        bg-neutral-950
        border
        border-white/10
        rounded-3xl
        p-8
        "

      >

        <h2 className="
        text-3xl
        font-black
        ">

          Platform Health

        </h2>


        <div className="
        grid
        md:grid-cols-3
        gap-5
        mt-6
        ">


          <div className="
          bg-black
          rounded-2xl
          p-6
          ">

            <p className="text-gray-500">
              Content Availability
            </p>

            <h3 className="
            text-4xl
            font-black
            mt-3
            ">

              {
                data?.totalMovies
                ?
                Math.round(
                  ((data.availableMovies /
                  data.totalMovies)
                  *100)
                )
                :
                0
              }%

            </h3>

          </div>





          <div className="
          bg-black
          rounded-2xl
          p-6
          ">

            <p className="text-gray-500">
              Featured Ratio
            </p>

            <h3 className="
            text-4xl
            font-black
            mt-3
            ">

              {
                data?.totalMovies
                ?
                Math.round(
                  ((data.featuredMovies /
                  data.totalMovies)
                  *100)
                )
                :
                0
              }%

            </h3>

          </div>





          <div className="
          bg-black
          rounded-2xl
          p-6
          ">

            <p className="text-gray-500">
              Total Engagement
            </p>

            <h3 className="
            text-4xl
            font-black
            mt-3
            ">

              {data?.totalViews || 0}

            </h3>

          </div>



        </div>


      </section>





    </main>

  );

}







function Card({

title,
value,
color

}:{
title:string;
value:number;
color:string;
}){


return (

<div className={`
rounded-3xl
p-6
${color}
`}>

<p className="opacity-80">
{title}
</p>


<h2 className="
text-4xl
font-black
mt-3
">

{value}

</h2>


</div>

);


}