import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { CreativeLoader, MovieCardSkeleton } from '../components/LoadingSpinner';
import { searchMovies, getPopularMovies, getTrendingMovies, Movie } from '../utils/api';
import { getRecentlyViewed } from '../utils/localStorage';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Filter, SortAsc, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recentlyViewedMovies, setRecentlyViewedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'recent'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadPopularMovies();
    loadTrendingMovies();
    setRecentlyViewedMovies(getRecentlyViewed());
    
    // Listen for changes to recently viewed movies
    const handleFavoritesChanged = () => {
      setRecentlyViewedMovies(getRecentlyViewed());
    };
    window.addEventListener('favoritesChanged', handleFavoritesChanged);
    
    return () => window.removeEventListener('favoritesChanged', handleFavoritesChanged);
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const data = await getTrendingMovies();
      setTrendingMovies(data.results.slice(0, 10));
    } catch (err) {
      console.error('Failed to load trending movies:', err);
    }
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPopularMovies(1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setQuery('');
      setPage(1);
    } catch (err) {
      setError('Failed to load movies. Please check your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError('');
    setQuery(searchQuery);
    setPage(1);
    try {
      const data = await searchMovies(searchQuery, 1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setLoading(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      const data = query 
        ? await searchMovies(query, newPage)
        : await getPopularMovies(newPage);
      setMovies(data.results);
      setPage(newPage);
    } catch (err) {
      setError('Failed to load page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = (moviesToSort: Movie[]) => {
    const sorted = [...moviesToSort];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => {
          const ratingA = a.vote_average || 0;
          const ratingB = b.vote_average || 0;
          if (ratingA === ratingB) {
            // If ratings are equal, sort by title
            return a.title.localeCompare(b.title);
          }
          return ratingB - ratingA;
        });
      case 'recent':
        return sorted.sort((a, b) => {
          const yearA = parseInt(a.release_date) || 0;
          const yearB = parseInt(b.release_date) || 0;
          if (yearA === yearB) {
            return a.title.localeCompare(b.title);
          }
          return yearB - yearA;
        });
      case 'popularity':
      default:
        // Sort alphabetically by title as default
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const displayedMovies = useMemo(() => sortMovies(movies), [movies, sortBy]);

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Discover Movies
            </h1>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
            Search for your favorite movies or explore popular titles
          </p>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Trending Section */}
        {!query && trendingMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Trending Now
              </h2>
            </div>
            <div className="relative overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-4 md:gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-5 lg:grid-cols-6">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.id} className="w-32 md:w-auto">
                    <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters and Sort */}
        {displayedMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">{displayedMovies.length} Movies Found</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <SortAsc className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              {(['popularity', 'rating', 'recent'] as const).map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    sortBy === option
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {option === 'popularity' ? 'Popular' : option === 'rating' ? 'Top Rated' : 'Recent'}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movies Grid */}
        {loading ? (
          <CreativeLoader />
        ) : displayedMovies.length > 0 ? (
          <>
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {displayedMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-md disabled:hover:border-gray-300 dark:disabled:hover:border-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Previous</span>
              </motion.button>
              
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg">
                <span className="font-bold">Page {page} of {Math.min(totalPages, 500)}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages || page >= 500}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-md disabled:hover:border-gray-300 dark:disabled:hover:border-gray-700"
              >
                <span className="font-medium">Next</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">No movies found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Try a different search term</p>
          </motion.div>
        )}

        {/* Recently Watched Section */}
        {recentlyViewedMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 md:mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 md:pt-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Recently Watched
              </h2>
            </div>
            <div className="relative overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-4 md:gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-5 lg:grid-cols-6">
                {recentlyViewedMovies.map((movie, index) => (
                  <div key={movie.id} className="w-32 md:w-auto">
                    <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};