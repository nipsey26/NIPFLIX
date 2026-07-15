const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";


async function fetchTMDB(endpoint: string) {

  const separator = endpoint.includes("?")
    ? "&"
    : "?";


  const res = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
    {
      cache: "no-store",
    }
  );


  const data = await res.json();

  return data;

}



// =====================
// MOVIES
// =====================


export async function getTrendingMovies() {

  const data = await fetchTMDB("/trending/movie/week");

  return data.results || [];

}



export async function getPopularMovies() {

  const data = await fetchTMDB("/movie/popular");

  return data.results || [];

}



export async function getTopRatedMovies() {

  const data = await fetchTMDB("/movie/top_rated");

  return data.results || [];

}



export async function getUpcomingMovies() {

  const data = await fetchTMDB("/movie/upcoming");

  return data.results || [];

}



export async function getNowPlayingMovies() {

  const data = await fetchTMDB("/movie/now_playing");

  return data.results || [];

}



// Movie details

export async function getMovieDetails(id: string) {

  return fetchTMDB(`/movie/${id}`);

}



// Movie trailer

export async function getMovieTrailer(id: string) {

  const data = await fetchTMDB(`/movie/${id}/videos`);


  const trailer = data.results?.find(
    (video: any) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );


  return trailer || null;

}



// Similar movies

export async function getSimilarMovies(id: string) {

  const data = await fetchTMDB(`/movie/${id}/similar`);

  return data.results || [];

}



// Search movies

export async function searchMovies(query: string) {

  const data = await fetchTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`
  );


  return data.results || [];

}





// =====================
// TV SHOWS
// =====================


export async function getTrendingTVShows() {

  const data = await fetchTMDB("/trending/tv/week");

  return data.results || [];

}



export async function getPopularTVShows() {

  const data = await fetchTMDB("/tv/popular");

  return data.results || [];

}



export async function getTopRatedTVShows() {

  const data = await fetchTMDB("/tv/top_rated");

  return data.results || [];

}



export async function getAiringTodayTVShows() {

  const data = await fetchTMDB("/tv/airing_today");

  return data.results || [];

}



// TV details

export async function getTVShowDetails(id: string) {

  return fetchTMDB(`/tv/${id}`);

}



// TV trailer

export async function getTVShowTrailer(id: string) {

  const data = await fetchTMDB(`/tv/${id}/videos`);


  const trailer = data.results?.find(
    (video: any) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );


  return trailer || null;

}



// Similar TV shows

export async function getSimilarTVShows(id: string) {

  const data = await fetchTMDB(`/tv/${id}/similar`);


  return data.results || [];

}



// Search TV shows

export async function searchTVShows(query: string) {

  const data = await fetchTMDB(
    `/search/tv?query=${encodeURIComponent(query)}`
  );


  return data.results || [];

}