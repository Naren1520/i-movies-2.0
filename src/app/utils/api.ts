// OMDB API Configuration
// API Key is stored in .env file
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'c6e23c30';
const OMDB_BASE_URL = import.meta.env.VITE_OMDB_API_URL || 'http://www.omdbapi.com/';

// Keep TMDB as fallback
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  credits?: {
    cast: { name: string; character: string }[];
  };
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_API_KEY}&page=${page}`
    );
    if (!response.ok) throw new Error('Failed to search movies');
    const data = await response.json();
    
    if (data.Response === 'False') {
      return { page, results: [], total_pages: 0, total_results: 0 };
    }
    
    // Transform OMDB response to match SearchResponse interface
    const results = (data.Search || []).map((movie: any) => ({
      id: parseInt(movie.imdbID.replace('tt', '')) || 0,
      title: movie.Title,
      poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
      release_date: movie.Year,
      vote_average: 0,
      overview: '',
      genre_ids: [],
    }));

    // Fetch detailed ratings for each movie
    const enrichedResults = await Promise.all(
      results.map(async (movie) => {
        try {
          const detailResponse = await fetch(
            `${OMDB_BASE_URL}?i=tt${movie.id}&apikey=${OMDB_API_KEY}`
          );
          const detailData = await detailResponse.json();
          if (detailData.Response !== 'False' && detailData.imdbRating) {
            movie.vote_average = parseFloat(detailData.imdbRating) || 0;
          }
        } catch (e) {
          console.error('Error fetching rating for movie:', movie.id);
        }
        return movie;
      })
    );

    return {
      page,
      results: enrichedResults,
      total_pages: 1,
      total_results: data.totalResults ? parseInt(data.totalResults) : 0,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?i=tt${movieId}&apikey=${OMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error('Movie not found');
    }

    // Transform OMDB response
    return {
      id: movieId,
      title: data.Title,
      poster_path: data.Poster !== 'N/A' ? data.Poster : null,
      release_date: data.Released,
      vote_average: parseFloat(data.imdbRating) || 0,
      overview: data.Plot,
      runtime: parseInt(data.Runtime) || 0,
      genres: data.Genre ? data.Genre.split(', ').map((g: string) => ({ id: 0, name: g })) : [],
      credits: {
        cast: data.Actors ? data.Actors.split(', ').map((actor: string) => ({ name: actor, character: '' })) : []
      }
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getPopularMovies = async (page: number = 1): Promise<SearchResponse> => {
  try {
    // OMDB doesn't have a "popular" endpoint, so we search for popular recent movies
    const response = await fetch(
      `${OMDB_BASE_URL}?s=movie&type=movie&apikey=${OMDB_API_KEY}&y=2023`
    );
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return { page, results: [], total_pages: 0, total_results: 0 };
    }
    
    return {
      page,
      results: (data.Search || []).map((movie: any) => ({
        id: parseInt(movie.imdbID.replace('tt', '')) || 0,
        title: movie.Title,
        poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
        release_date: movie.Year,
        vote_average: 0,
        overview: '',
        genre_ids: [],
      })),
      total_pages: 1,
      total_results: data.totalResults ? parseInt(data.totalResults) : 0,
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<SearchResponse> => {
  try {
    // OMDB doesn't have trending endpoint, so search for popular recent movies
    const response = await fetch(
      `${OMDB_BASE_URL}?s=movie&type=movie&apikey=${OMDB_API_KEY}&y=2024`
    );
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
    
    return {
      page: 1,
      results: (data.Search || []).map((movie: any) => ({
        id: parseInt(movie.imdbID.replace('tt', '')) || 0,
        title: movie.Title,
        poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
        release_date: movie.Year,
        vote_average: 0,
        overview: '',
        genre_ids: [],
      })),
      total_pages: 1,
      total_results: data.totalResults ? parseInt(data.totalResults) : 0,
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getPosterUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  // If path is already a full URL (from OMDB), return it as is
  if (path.startsWith('http')) return path;
  // Otherwise, construct TMDB URL (for backward compatibility)
  return `${IMAGE_BASE_URL}/${size}${path}`;
};