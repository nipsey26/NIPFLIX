export type NIPFLIXMovie = {
  id:number;
  title:string;
  poster:string;
  videoUrl:string;
  description:string;
  category:string;
  year:number;
};


export const movies:NIPFLIXMovie[] = [

  {
    id:1,

    title:"Elephants Dream",

    poster:
    "https://upload.wikimedia.org/wikipedia/commons/5/58/Elephants_Dream_s5_both.jpg",

    videoUrl:
    "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",

    description:
    "A free open-source animated film created with Blender.",

    category:
    "Animation",

    year:
    2006,
  }

];



export function getMovies(){

  return movies.filter(
    movie =>
    movie.videoUrl &&
    movie.poster
  );

}



export function getMovie(id:number){

  return movies.find(
    movie =>
    movie.id === id
  );

}