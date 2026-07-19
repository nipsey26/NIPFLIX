const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";



async function tmdbFetch(
  endpoint:string
){

  const res = await fetch(

    `${BASE_URL}${endpoint}&api_key=${API_KEY}`,

    {
      next:{
        revalidate:3600
      }
    }

  );


  if(!res.ok){

    console.log(
      "TMDB Error:",
      res.status
    );

    return {};

  }


  return res.json();

}






export async function getTrendingMovies(){

  const data =
    await tmdbFetch(
      "/trending/movie/week?"
    );


  return data.results || [];

}







export async function getPopularMovies(){

  const data =
    await tmdbFetch(
      "/movie/popular?"
    );


  return data.results || [];

}







export async function getTopRatedMovies(){

  const data =
    await tmdbFetch(
      "/movie/top_rated?"
    );


  return data.results || [];

}







export async function getNowPlayingMovies(){

  const data =
    await tmdbFetch(
      "/movie/now_playing?"
    );


  return data.results || [];

}







export async function getUpcomingMovies(){

  const data =
    await tmdbFetch(
      "/movie/upcoming?"
    );


  return data.results || [];

}








export async function getMovieDetails(
  id:string
){

  const data =
    await tmdbFetch(
      `/movie/${id}?`
    );


  return data;

}








export async function getMovieVideos(
  id:string
){

  const data =
    await tmdbFetch(
      `/movie/${id}/videos?`
    );


  return data.results || [];

}








export async function getSimilarMovies(
  id:string
){

  const data =
    await tmdbFetch(
      `/movie/${id}/similar?`
    );


  return data.results || [];

}








export async function searchMovies(
  query:string
){

  if(!query){

    return [];

  }



  const data =
    await tmdbFetch(

      `/search/movie?query=${encodeURIComponent(query)}`

    );



  return data.results || [];

}