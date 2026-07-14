const API_KEY = process.env.TMDB_API_KEY;

export async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await res.json();

  return data.results;
}