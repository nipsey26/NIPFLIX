import prisma from "@/app/lib/prisma";


export async function saveWatchProgress({
  userId,
  mediaId,
  mediaType,
  progress = 0,
}: {
  userId: string;
  mediaId: string;
  mediaType: string;
  progress?: number;
}) {

  return await prisma.watchProgress.upsert({

    where: {
      userId_mediaId_mediaType: {
        userId,
        mediaId,
        mediaType,
      },
    },

    update: {
      progress,
    },

    create: {
      userId,
      mediaId,
      mediaType,
      progress,
    },

  });

}




export async function getWatchProgress(userId: string) {

  return await prisma.watchProgress.findMany({

    where: {
      userId,
    },

    orderBy: {
      updatedAt: "desc",
    },

  });

}