import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Clock, Calendar, Play, Users, Film } from 'lucide-react';
import { getMovieDetails, getPosterUrl, Movie } from '../utils/api';
import { searchMovieTrailer, YoutubeVideo } from '../utils/youtube';
import { addFavorite, removeFavorite, isFavorite, addRecentlyViewed } from '../utils/localStorage';
import { CreativeLoader } from '../components/CreativeLoader';
import { motion, AnimatePresence } from 'motion/react';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [video, setVideo] = useState<YoutubeVideo | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    if (id) {
      loadMovie(parseInt(id));
      setFavorite(isFavorite(parseInt(id)));
    }
  }, [id]);

  const loadMovie = async (movieId: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await getMovieDetails(movieId);
      setMovie(data);
      addRecentlyViewed(data);
      
      // Load trailer video
      setLoadingVideo(true);
      const trailer = await searchMovieTrailer(data.title);
      setVideo(trailer);
      setLoadingVideo(false);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (favorite) {
      removeFavorite(movie.id);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
    
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  const handleWatchMovie = () => {
    if (!video) return;
    
    navigate(`/watch/${movie?.id}`, {
      state: {
        videoId: video.id,
        movieTitle: movie?.title
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoader />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">{error || 'Movie not found'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Go Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

  return (
    <div className="min-h-screen pb-12">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg flex items-center gap-2"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-medium">Added to favorites!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Backdrop */}
      <div className="relative h-[40vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={getPosterUrl(movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 dark:from-gray-900/50 to-transparent" />
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-xl z-10"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
        </motion.button>

        {/* Favorite Button - Top Right */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteToggle}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-xl z-10 ${
            favorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Heart className={`w-5 h-5 md:w-6 md:h-6 ${favorite ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 lg:-mt-48 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr] gap-8 md:gap-10">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={getPosterUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  {movie.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{year}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{runtime}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{rating}/10</span>
                  </div>
                  {movie.vote_count && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        {(movie.vote_count / 1000).toFixed(1)}K
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {movie.genres.map((genre, index) => (
                  <motion.span
                    key={genre.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md"
                  >
                    {genre.name}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Watch Button */}
            {!loadingVideo && video && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                onClick={handleWatchMovie}
                className="mb-6 w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <Film className="w-5 h-5 group-hover:animate-bounce" />
                Watch Trailer
              </motion.button>
            )}

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Play className="w-6 h-6 text-blue-500" />
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                {movie.overview || 'No overview available.'}
              </p>
            </motion.div>

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-500" />
                  Top Cast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {movie.credits.cast.map((actor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">{actor.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{actor.character}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};