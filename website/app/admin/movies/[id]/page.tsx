import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import MovieEditForm from "./MovieEditForm";


export default async function EditMoviePage({

  params,

}: {

  params: Promise<{
    id:string;
  }>;

}) {


  const { id } = await params;



  if(!id){

    redirect("/admin/movies");

  }




  const movie = await prisma.movie.findUnique({

    where:{
      id:id,
    },

  });






  if(!movie){

    redirect("/admin/movies");

  }





  return (

    <main

      className="
      min-h-screen
      bg-black
      text-white
      "

    >


      <h1

        className="
        text-5xl
        font-black
        mb-10
        "

      >

        Edit Movie

      </h1>




      <MovieEditForm

        movie={movie}

      />



    </main>

  );


}