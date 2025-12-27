// YouTube API Configuration
const YOUTUBE_API_KEY = (import.meta as any).env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

export interface YoutubeTrailerResult {
  videoId: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

/**
 * Search for movie trailer on YouTube
 * @param movieTitle - Title of the movie to search for
 * @returns YoutubeVideo object or null if not found
 */
export const searchMovieTrailer = async (movieTitle: string): Promise<YoutubeVideo | null> => {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
      console.warn('YouTube API key not configured');
      return null;
    }

    const searchQuery = `${movieTitle} trailer official`;
    
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=1&order=relevance&regionCode=US&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to search YouTube');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const video = data.items[0];
    const videoId = video.id.videoId;

    return {
      id: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  } catch (error) {
    console.error('Error searching for movie trailer:', error);
    return null;
  }
};

/**
 * Search for multiple movie trailers
 * @param query - Search query (movie name, actor, etc)
 * @returns Array of YoutubeTrailerResult objects
 */
export const searchMovieTrailersYoutube = async (query: string): Promise<YoutubeTrailerResult[]> => {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
      console.warn('YouTube API key not configured');
      return [];
    }

    const searchQuery = `${query} trailer`;
    
    const response = await fetch(
      `${YOUTUBE_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=12&order=relevance&regionCode=US&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to search YouTube');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    return data.items.map((video: any) => ({
      videoId: video.id.videoId,
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url
    }));
  } catch (error) {
    console.error('Error searching for trailers:', error);
    return [];
  }
};

/**
 * Get YouTube embed URL
 * @param videoId - YouTube video ID
 * @returns Embed URL for iframe
 */
export const getYoutubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`;
};
