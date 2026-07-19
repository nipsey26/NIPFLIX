import { prisma } from "@/app/lib/prisma";


export async function saveWatchProgress({

  userId,

  mediaId,

  mediaType = "movie",

  title,

  posterPath,

  overview,

  progress,

}: {

  userId: string;

  mediaId: string;

  mediaType?: string;

  title: string;

  posterPath?: string;

  overview?: string;

  progress: number;

}) {


  const saved = await prisma.watchProgress.upsert({


    where: {

      userId_mediaId_mediaType: {

        userId,

        mediaId,

        mediaType,

      },

    },



    update: {

      progress,

      title,

      posterPath,

      overview,

    },



    create: {

      userId,

      mediaId,

      mediaType,

      title,

      posterPath,

      overview,

      progress,

    },


  });



  return saved;


}