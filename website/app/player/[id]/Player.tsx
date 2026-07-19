"use client";

import { useEffect, useRef } from "react";



export default function Player({

movie,

}:{

movie:any;

}){


const videoRef =
useRef<HTMLVideoElement>(null);



useEffect(()=>{


async function addView(){


await fetch(

"/api/movies/view",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

id:movie.id

})

}

);


}


addView();


},[movie.id]);







async function saveProgress(){


const video =
videoRef.current;


if(!video || !video.duration){

return;

}



await fetch(

"/api/watch-progress",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

userId:"demo-user",

mediaId:movie.id,

mediaType:"MOVIE",

title:movie.title,

posterPath:movie.poster,

overview:movie.description,

progress:
video.currentTime /
video.duration

})

}

);


}







return (

<video

ref={videoRef}

controls

onTimeUpdate={(e)=>{


const video =
e.currentTarget;


if(
Math.floor(video.currentTime) % 15 === 0
){

saveProgress();

}


}}

className="
w-full
h-full
"

src={movie.videoUrl}

/>

);

}