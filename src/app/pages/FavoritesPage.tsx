import React, { useState, useEffect } from 'react';
import { Heart, Trash2, GripVertical } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { getFavorites, saveFavorites } from '../utils/localStorage';
import { Movie } from '../utils/api';
import { motion, Reorder, AnimatePresence } from 'motion/react';

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    loadFavorites();
    
    // Listen for storage changes to update favorites in real-time
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event when favorites change in same tab
    window.addEventListener('favoritesChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesChanged', handleStorageChange);
    };
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleReorder = (newOrder: Movie[]) => {
    setFavorites(newOrder);
    saveFavorites(newOrder);
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      saveFavorites([]);
      setFavorites([]);
      window.dispatchEvent(new Event('favoritesChanged'));
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-current" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  My Favorites
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
                  {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
                </p>
              </div>
            </div>
            
            {favorites.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </motion.button>
            )}
          </div>

          {favorites.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-300"
            >
              <GripVertical className="w-4 h-4 flex-shrink-0" />
              <span>Drag and drop to reorder your favorites</span>
            </motion.div>
          )}
        </motion.div>

        {/* Movies Grid with Drag and Drop */}
        {favorites.length > 0 ? (
          <Reorder.Group
            axis="y"
            values={favorites}
            onReorder={handleReorder}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {favorites.map((movie, index) => (
                <Reorder.Item
                  key={movie.id}
                  value={movie}
                  className="list-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileDrag={{ 
                    scale: 1.05,
                    zIndex: 1000,
                    cursor: 'grabbing',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="relative group h-full">
                    {/* Drag Handle - only visible on hover */}
                    <motion.div
                      className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="p-2 bg-blue-500 text-white rounded-full shadow-lg">
                        <GripVertical className="w-4 h-4" />
                      </div>
                    </motion.div>
                    
                    <MovieCard movie={movie} index={index} />
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Heart className="w-20 h-20 md:w-24 md:h-24 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
              Start adding movies to your favorites to see them here
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>Discover Movies</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};