export type MovieSource = {
  id: number;
  title: string;
  poster: string;
  video: string;
  description: string;
};



export const freeMovies: MovieSource[] = [

  {
    id: 999999,

    title: "Elephants Dream",

    poster:
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Elephants_Dream_s5_both.jpg",

    video:
      "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",

    description:
      "A free open-source animated film created with Blender."
  },



  {
    id: 10331,

    title: "Night of the Living Dead",

    poster:
      "https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",

    video:
      "https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4",

    description:
      "A classic public-domain horror film."
  },



  {
    id: 200001,

    title: "Sintel",

    poster:
      "https://upload.wikimedia.org/wikipedia/en/3/37/Sintel_poster.jpg",

    video:
      "https://archive.org/download/Sintel/Sintel.mp4",

    description:
      "A free fantasy animated short film from the Blender Foundation."
  },



  {
    id: 200002,

    title: "Big Buck Bunny",

    poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Big_Buck_Bunny_poster_big.jpg/500px-Big_Buck_Bunny_poster_big.jpg",

    video:
      "https://archive.org/download/BigBuckBunny_124/BigBuckBunny.mp4",

    description:
      "A free animated short film featuring Big Buck Bunny."
  },



  {
    id: 200003,

    title: "Cosmos Laundromat",

    poster:
      "https://upload.wikimedia.org/wikipedia/en/7/70/Cosmos_Laundromat_poster.jpg",

    video:
      "https://archive.org/download/CosmosLaundromat/Cosmos_Laundromat.mp4",

    description:
      "A free animated short film created with Blender."
  }


];





export function getMovieSource(movieId:number){

  return (
    freeMovies.find(
      (movie)=>movie.id === movieId
    )?.video || ""
  );

}



export function getFreeMovie(movieId:number){

  return freeMovies.find(
    (movie)=>movie.id === movieId
  );

}