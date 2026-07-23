import { prisma } from "@/app/lib/prisma";



export async function getNipflixMovies() {

  const movies =
    await prisma.movie.findMany({

      where: {
        published: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });


  return movies;

}







export async function getFeaturedMovies() {

  const movies =
    await prisma.movie.findMany({

      where: {

        published: true,

        featured: true,

      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,

    });


  return movies;

}







export async function getPopularMovies() {

  const movies =
    await prisma.movie.findMany({

      where: {
        published: true,
      },

      orderBy: {

        views: "desc",

      },

      take: 20,

    });


  return movies;

}







export async function getLatestMovies() {

  const movies =
    await prisma.movie.findMany({

      where: {
        published: true,
      },

      orderBy: {

        createdAt: "desc",

      },

      take: 20,

    });


  return movies;

}