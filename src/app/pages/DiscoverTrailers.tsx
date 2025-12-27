import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { CreativeLoader } from '../components/CreativeLoader';
import { searchMovieTrailersYoutube, YoutubeTrailerResult } from '../utils/youtube';

export const DiscoverTrailers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<YoutubeTrailerResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const trailers = await searchMovieTrailersYoutube(searchQuery);
      setResults(trailers);
      if (trailers.length === 0) {
        setError('No trailers found. Try a different search.');
      }
    } catch (err) {
      setError('Failed to search trailers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchTrailer = (trailer: YoutubeTrailerResult) => {
    navigate(`/watch/${trailer.id}`, {
      state: {
        videoId: trailer.videoId,
        movieTitle: trailer.title
      }
    });
  };

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="mb-6 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-xl inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="text-gray-900 dark:text-white font-medium">Back</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Movie Trailers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and watch trailers for your favorite movies
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="mb-12"
        >
          <div className="relative flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, actors, or genres..."
                className="w-full px-6 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </motion.button>
          </div>
        </motion.form>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <CreativeLoader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/30 border-2 border-red-500 rounded-xl p-6 mb-8 text-red-600 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {searched && !loading && results.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No trailers found. Try searching for a different movie!
            </p>
          </motion.div>
        )}

        {/* Results Grid */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {results.length} Trailer{results.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((trailer, index) => (
                <motion.div
                  key={trailer.videoId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <motion.img
                      src={trailer.thumbnail}
                      alt={trailer.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleWatchTrailer(trailer)}
                        className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                      {trailer.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {trailer.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWatchTrailer(trailer)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Watch Trailer
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Initial State */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Search for your favorite movies to find their trailers
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Inception', 'Avatar', 'The Matrix', 'Interstellar', 'Avengers'].map((movie) => (
                <motion.button
                  key={movie}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery(movie);
                    // Trigger search
                    setTimeout(() => {
                      document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));
                    }, 0);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {movie}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
