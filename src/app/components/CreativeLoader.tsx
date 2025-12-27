import React from 'react';
import { motion } from 'motion/react';
import { Popcorn, Clapperboard, Star } from 'lucide-react';

export const CreativeLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-32 h-32 mb-8">
        {/* Central Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img 
            src="/assets/logo.png" 
            alt="MovieApp Logo" 
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>

        {/* Orbiting Icons */}
        {[
          { Icon: Popcorn, color: 'text-yellow-500', delay: 0 },
          { Icon: Clapperboard, color: 'text-purple-500', delay: 0.33 },
          { Icon: Star, color: 'text-pink-500', delay: 0.66 },
        ].map(({ Icon, color, delay }, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          >
            <motion.div
              className={`absolute top-0 left-1/2 -translate-x-1/2 ${color}`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          </motion.div>
        ))}

        {/* Pulsing circles */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 border-4 border-blue-500 rounded-full"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Loading Movies
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Preparing something amazing...
        </p>
      </motion.div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden"
    >
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <img 
              src="/assets/logo.png" 
              alt="MovieApp Logo" 
              className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-lg mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Star className="w-8 h-8 text-yellow-300 absolute -top-2 left-1/2 -translate-x-1/2" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-white mb-3"
        >
          i-Movies 2.0
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/90 text-lg md:text-xl mb-8"
        >
          Your ultimate movie companion
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-64 md:w-80 h-2 bg-white/20 rounded-full mx-auto overflow-hidden backdrop-blur-sm"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.3, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Subtitle animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-white/80 text-sm"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading amazing content...
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};