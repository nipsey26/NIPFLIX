const LIBRARY_ID =
  process.env.BUNNY_STREAM_LIBRARY_ID;

const API_KEY =
  process.env.BUNNY_STREAM_API_KEY;


const BASE_URL =
  `https://video.bunnycdn.com/library/${LIBRARY_ID}`;



export async function createVideo(
  title:string
){

  const response = await fetch(
    `${BASE_URL}/videos`,
    {
      method:"POST",

      headers:{
        "AccessKey": API_KEY!,
        "Content-Type":"application/json",
      },

      body:JSON.stringify({
        title,
      }),

    }
  );


  if(!response.ok){

    const text =
      await response.text();

    throw new Error(
      "Bunny create video failed: " + text
    );

  }


  return await response.json();

}





export async function uploadVideo(
  guid:string,
  buffer:Buffer
){

  const response =
    await fetch(
      `${BASE_URL}/videos/${guid}`,
      {

        method:"PUT",

        headers:{
          "AccessKey":API_KEY!,
          "Content-Type":"application/octet-stream",
        },

        body:buffer as any,

      }
    );


  if(!response.ok){

    const text =
      await response.text();

    throw new Error(
      "Bunny upload failed: " + text
    );

  }


  return true;

}






export async function getVideoDetails(
  guid:string
){

  const response =
    await fetch(
      `${BASE_URL}/videos/${guid}`,
      {

        headers:{
          "AccessKey":API_KEY!,
        },

      }
    );


  if(!response.ok){

    throw new Error(
      "Could not get Bunny details"
    );

  }


  return await response.json();

}







export async function getVideos(){

  const response =
    await fetch(
      `${BASE_URL}/videos`,
      {

        headers:{
          "AccessKey":API_KEY!,
        },

      }
    );


  if(!response.ok){

    return [];

  }


  return await response.json();

}







export function getBunnyEmbedUrl(
  guid:string
){

  return (
    `https://iframe.mediadelivery.net/embed/` +
    `${LIBRARY_ID}/${guid}`
  );

}