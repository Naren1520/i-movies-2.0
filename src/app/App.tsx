import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Chatbot } from './components/Chatbot';
import { SearchPage } from './pages/SearchPage';
import { MovieDetails } from './pages/MovieDetails';
import { FavoritesPage } from './pages/FavoritesPage';
import { WatchMovie } from './pages/WatchMovie';
import { DiscoverTrailers } from './pages/DiscoverTrailers';
import { AboutDeveloper } from './pages/AboutDeveloper';
import { SplashScreen } from './components/CreativeLoader';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatePresence>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors"
        >
          <Navigation />
          <Chatbot />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route path="/discover" element={<DiscoverTrailers />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutDeveloper />} />
          </Routes>
        </motion.div>
      </BrowserRouter>
    </ThemeProvider>
  );
}