import { prisma } from "@/app/lib/prisma";


export async function getPublishedMovies(){

  return await prisma.movie.findMany({

    where:{
      published:true
    },

    orderBy:{
      createdAt:"desc"
    }

  });

}



export async function getFeaturedMovies(){

  return await prisma.movie.findMany({

    where:{
      featured:true,
      published:true
    },

    orderBy:{
      createdAt:"desc"
    }

  });

}



export async function getMoviesByCategory(
  category:string
){

  return await prisma.movie.findMany({

    where:{
      category,
      published:true
    },

    orderBy:{
      createdAt:"desc"
    }

  });

}



export async function getContinueWatching(){

  return await prisma.watchProgress.findMany({

    orderBy:{
      updatedAt:"desc"
    },

    take:10

  });

}



export async function getDatabaseMovies(
  query: string = ""
){

  return await prisma.movie.findMany({

    where: {

      published: true,

      ...(query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                },
              },

              {
                category: {
                  contains: query,
                },
              },
            ],
          }
        : {})

    },

    orderBy: {

      createdAt: "desc"

    }

  });

}