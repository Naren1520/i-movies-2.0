import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Info } from 'lucide-react';
import { Movie, getPosterUrl } from '../utils/api';
import { motion } from 'motion/react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/localStorage';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const [favorite, setFavorite] = useState(isFavorite(movie.id));
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(movie.id);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
    
    // Dispatch custom event for favorites page to update
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative">
          {/* Favorite Button */}
          <motion.button
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              favorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400'
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${favorite ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
            <motion.img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover Info */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-white mb-2">
                <Info className="w-4 h-4" />
                <span className="text-sm">Click for details</span>
              </div>
            </motion.div>

            {/* Rating Badge */}
            <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 rounded-lg flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 md:w-4 md:h-4 fill-current text-white" />
              <span className="text-white text-xs md:text-sm font-bold">{rating}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 md:p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 flex-1">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-medium">{year}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                {movie.vote_count ? `${(movie.vote_count / 1000).toFixed(1)}K votes` : 'New'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};