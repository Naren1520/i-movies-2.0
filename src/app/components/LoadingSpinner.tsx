import React from 'react';
import { Loader2 } from 'lucide-react';
import { CreativeLoader as MainCreativeLoader } from './CreativeLoader';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
};

// Export CreativeLoader for backward compatibility
export const CreativeLoader = MainCreativeLoader;

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 aspect-[2/3] rounded-lg mb-4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
    </div>
  );
};