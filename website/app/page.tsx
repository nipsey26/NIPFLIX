import { prisma } from "@/app/lib/prisma";
import HomeClient from "./components/HomeClient";


export default async function HomePage(){


  const movies = await prisma.movie.findMany({

    where:{
      published:true,
    },

    orderBy:{
      createdAt:"desc",
    },

  });





  const featured = await prisma.movie.findFirst({

    where:{
      published:true,
      featured:true,
    },

    orderBy:{
      createdAt:"desc",
    },

  });







  const categories = {

    action:
      movies.filter((movie)=>
        movie.category
        ?.toLowerCase()
        .includes("action")
      ),


    comedy:
      movies.filter((movie)=>
        movie.category
        ?.toLowerCase()
        .includes("comedy")
      ),


    horror:
      movies.filter((movie)=>
        movie.category
        ?.toLowerCase()
        .includes("horror")
      ),

  };








  return (

    <HomeClient


      featured={
        featured || movies[0]
      }





      databaseMovies={movies}






      featuredMovies={

        movies.filter(
          movie=>movie.featured
        )

      }






      actionMovies={

        categories.action

      }






      comedyMovies={

        categories.comedy

      }






      horrorMovies={

        categories.horror

      }







      trending={movies}






      popular={movies}






      topRated={movies}






      nowPlaying={movies}






      upcoming={movies}






      continueWatching={[]}



    />

  );

}