import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getYoutubeEmbedUrl } from '../utils/youtube';
import { motion } from 'motion/react';
import { CreativeLoader } from '../components/CreativeLoader';

interface LocationState {
  videoId?: string;
  movieTitle?: string;
}

export const WatchMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [loading, setLoading] = useState(!state?.videoId);

  const videoId = state?.videoId;
  const movieTitle = state?.movieTitle || 'Movie';

  useEffect(() => {
    if (videoId) {
      setLoading(false);
    }
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoader />
      </div>
    );
  }

  if (!videoId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">
            Video not available for this movie
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(videoId);

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {movieTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Official Trailer
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full bg-black rounded-2xl shadow-2xl overflow-hidden"
          style={{
            aspectRatio: '16 / 9'
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={`${movieTitle} - Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        </motion.div>

        {/* Video Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {movieTitle} - Official Trailer
            </h2>
            <motion.a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
              title="Watch on YouTube"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Watch the official trailer on YouTube. Click the YouTube icon to watch on the official platform for better quality options.
          </p>
        </motion.div>

        {/* Related Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Back to Movie Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/discover')}
            className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Watch More Trailers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
