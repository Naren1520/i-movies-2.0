import { Movie } from './api';

const FAVORITES_KEY = 'movieapp_favorites';
const RECENTLY_VIEWED_KEY = 'movieapp_recently_viewed';
const THEME_KEY = 'movieapp_theme';

export const getFavorites = (): Movie[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites: Movie[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addFavorite = (movie: Movie): void => {
  const favorites = getFavorites();
  const exists = favorites.some(fav => fav.id === movie.id);
  if (!exists) {
    saveFavorites([...favorites, movie]);
  }
};

export const removeFavorite = (movieId: number): void => {
  const favorites = getFavorites();
  saveFavorites(favorites.filter(fav => fav.id !== movieId));
};

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === movieId);
};

export const getRecentlyViewed = (): Movie[] => {
  try {
    const data = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading recently viewed:', error);
    return [];
  }
};

export const addRecentlyViewed = (movie: Movie): void => {
  try {
    let recent = getRecentlyViewed();
    recent = recent.filter(m => m.id !== movie.id);
    recent.unshift(movie);
    recent = recent.slice(0, 10);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
  } catch (error) {
    console.error('Error saving recently viewed:', error);
  }
};

export const getTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return (theme as 'light' | 'dark') || 'light';
  } catch (error) {
    return 'light';
  }
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};
