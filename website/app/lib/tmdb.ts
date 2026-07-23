const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

async function tmdb(endpoint: string) {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is missing");
  }

  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB Error ${response.status}`);
  }

  return response.json();
}

export async function getTrendingMovies() {
  const data = await tmdb("/trending/movie/week");
  return data.results ?? [];
}

export async function getPopularMovies() {
  const data = await tmdb("/movie/popular");
  return data.results ?? [];
}

export async function getTopRatedMovies() {
  const data = await tmdb("/movie/top_rated");
  return data.results ?? [];
}

export async function getNowPlayingMovies() {
  const data = await tmdb("/movie/now_playing");
  return data.results ?? [];
}

export async function getUpcomingMovies() {
  const data = await tmdb("/movie/upcoming");
  return data.results ?? [];
}

export async function getMovieDetails(id: string) {
  return await tmdb(
    `/movie/${id}?append_to_response=credits,videos,images,recommendations`
  );
}

export async function getMovieVideos(id: string) {
  const data = await tmdb(`/movie/${id}/videos`);
  return data.results ?? [];
}

export async function getSimilarMovies(id: string) {
  const data = await tmdb(`/movie/${id}/similar`);
  return data.results ?? [];
}

export async function searchMovies(query: string) {
  if (!query) return [];

  const data = await tmdb(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data.results ?? [];
}

export async function getTVShows() {
  const data = await tmdb("/tv/popular");
  return data.results ?? [];
}

export async function getTVShow(id: string) {
  return await tmdb(
    `/tv/${id}?append_to_response=credits,videos`
  );
}

export async function getTVSeason(
  id: string,
  season: number
) {
  return await tmdb(
    `/tv/${id}/season/${season}`
  );
}