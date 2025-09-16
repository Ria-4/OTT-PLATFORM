const BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgwNzJiNmYyNWYzMzU5MDUzNGI4YzM1ZjIxMDcwMiIsIm5iZiI6MTc1NTYyMzU1MC4wMjU5OTk4LCJzdWIiOiI2OGE0YjA3ZTI1MzVkZTUzNmM1ZGNmYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jFG0NJuzA_k1CIprjP2eYLBj7xLp2mAJrqSlYOGSM4`
  }
};

// ✅ Wrapper for fetch
const fetchFromTMDB = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (err) {
    console.error("TMDB API error:", err);
    throw err;
  }
};

export const requests = {
  // Movies
  getNowPlayingMovies: () => fetchFromTMDB("/movie/now_playing?language=en-US&page=1"),

  // TV Shows
  getAiringTodayTV: () => fetchFromTMDB("/tv/airing_today?language=en-US&page=1"),

  // Movie details by ID
  getMovieDetails: (id) => fetchFromTMDB(`/movie/${id}?language=en-US`),

  // Search
  searchMovies: (query) => fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`),
};
