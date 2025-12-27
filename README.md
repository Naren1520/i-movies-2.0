# i-Movies 2.0 - Your Ultimate Movie Companion

A modern, responsive Movie App built with React.js, featuring real-time TMDB API integration, dark mode, favorites management, and smooth animations.

##  Features

### Core Features
- **Advanced Search** - Search for movies with real-time results
- **Movie Details** - View comprehensive information including cast, ratings, and overview
- **Favorites Management** - Save and organize your favorite movies with localStorage persistence
- **Dark Mode Toggle** - Seamless theme switching with system preference detection
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **AI Chatbot** - Built-in Gemini AI assistant for instant support
- **About Developer** - Learn about the creator and explore his portfolio

### Interactive Features
- **Smooth Animations** - Beautiful Motion (Framer Motion) animations throughout
- **Splash Screen** - Engaging loading experience on app launch
- **Trending Section** - Discover what's popular right now
- **Drag & Drop** - Reorder your favorites with intuitive drag-and-drop
- **Creative Loaders** - Animated loading states with cinematic effects
- **Interactive Cards** - Hover effects and micro-interactions
- **Sort & Filter** - Organize movies by popularity, rating, or release date
- **Rating Badges** - Visual rating indicators on movie cards
- **Floating Chatbot** - Always accessible AI assistant with minimize/maximize functions
- **Chat History** - View entire conversation history

### User Experience
- **Fast Performance** - Optimized rendering and lazy loading
- **Local Storage** - Persistent favorites across sessions
- **Intuitive Navigation** - Clear routing and breadcrumbs
- **Vote Counts** - See how many users rated each movie
- **Beautiful UI** - Gradient backgrounds and modern design
- **Success Notifications** - Visual feedback for user actions

## Tech Stack

- **React.js 18.3.1** - UI library
- **TypeScript** - Type safety
- **React Router DOM 7.11.0** - Client-side routing
- **Motion (Framer Motion) 12** - Smooth animations
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Modern icon library
- **TMDB API** - Movie data integration
- **Google Gemini API** - AI-powered chatbot
- **Vite** - Build tool and dev server

## 📋Prerequisites

- Node.js 16+ and npm/pnpm
- TMDB API Key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))
- Google Gemini API Key (free from [Google AI Studio](https://aistudio.google.com/))

##  Getting Started

### 1. Get Your TMDB API Key

1. Visit [TMDB Website](https://www.themoviedb.org/)
2. Create a free account or sign in
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure API Keys

Create or update your `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_OMDB_API_URL=http://www.omdbapi.com/
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```


```

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm run dev
```

Visit `http://localhost:5173` to see your app!

##  Responsive Design

The app is fully optimized for all screen sizes:

### Desktop (1024px+)
- 5-column grid layout
- Hover effects and tooltips
- Drag-and-drop favorites reordering
- Full navigation menu

### Tablet (768px - 1023px)
- 3-4 column grid layout
- Touch-optimized interactions
- Responsive typography

### Mobile (< 768px)
- 2-column grid layout
- Mobile-friendly navigation
- Touch gestures
- Optimized button sizes

##  Features in Detail

### Search Page
- **Popular Movies** - Displays trending movies on load
- **Trending Section** - Horizontal scrollable carousel of trending movies
- **Sort Options** - Sort by popularity, rating, or release date
- **Pagination** - Navigate through thousands of movies
- **Filter Info** - Shows number of movies found

### Movie Details Page
- **Hero Section** - Full-width backdrop image
- **Movie Information** - Title, year, runtime, rating, vote count
- **Genres** - Color-coded genre tags
- **Overview** - Movie synopsis
- **Cast** - Top 10 cast members with character names
- **Quick Actions** - Add to favorites, go back

### Favorites Page
- **Drag & Drop** - Reorder favorites by dragging cards
- **Clear All** - Remove all favorites with confirmation
- **Empty State** - Helpful message when no favorites exist
- **Real-time Sync** - Updates across all open tabs

### Chatbot
- **AI Assistant** - Powered by Google Gemini API
- **Always Available** - Floating button on every page
- **Minimize/Maximize** - Control chat window size
- **Message History** - View all previous conversations
- **Real-time Responses** - Instant answers to your questions

### About Developer
- **Developer Profile** - Learn about the creator
- **Skills Showcase** - Technical expertise and tools
- **Experience Timeline** - Professional background
- **Contact Links** - WhatsApp, GitHub, LinkedIn, Email, Portfolio
- **Achievements** - Hackathons and milestones

### Dark Mode
- **System Preference** - Auto-detects system theme
- **Manual Toggle** - Switch themes with animated button
- **Persistent** - Saves preference to localStorage
- **Smooth Transitions** - All elements transition smoothly

##  Animations

The app features extensive Motion animations:

- **Page Transitions** - Smooth page changes
- **Card Animations** - Staggered entrance animations
- **Hover Effects** - Scale, shadow, and transform effects
- **Loading States** - Creative animated loaders
- **Success Messages** - Slide-in notifications
- **Drag Interactions** - Visual feedback while dragging
- **Splash Screen** - Engaging app launch animation

## Project Structure

```
/src
  /app
    /components          # Reusable UI components
      - CreativeLoader.tsx
      - LoadingSpinner.tsx
      - MovieCard.tsx
      - Navigation.tsx
      - SearchBar.tsx
      - ThemeToggle.tsx
      - Chatbot.tsx          # AI Chatbot component
    /contexts           # React contexts
      - ThemeContext.tsx
    /pages             # Page components
      - SearchPage.tsx
      - MovieDetails.tsx
      - FavoritesPage.tsx
      - AboutDeveloper.tsx   # Developer profile page
    /utils             # Utility functions
      - api.ts
      - localStorage.ts
    App.tsx           # Main app component
  /styles
    - fonts.css
    - index.css
    - tailwind.css
    - theme.css
```

## Code Quality

- **TypeScript** - Full type safety
- **Component Modularity** - Reusable, single-responsibility components
- **Clean Architecture** - Separation of concerns
- **Error Handling** - Comprehensive error states
- **Loading States** - Proper loading indicators
- **Accessibility** - Semantic HTML and ARIA labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Integration

The app uses the TMDB API for:
- Searching movies
- Getting popular movies
- Fetching trending movies
- Movie details with cast information
- High-quality movie posters

## Tips

1. **API Key Security** - Never commit your API keys to public repositories; use `.env` files
2. **Gemini API** - Free tier allows limited requests; monitor your usage at Google AI Studio
3. **Favorites Limit** - No limit on favorites, but stored in localStorage (max 5-10MB)
4. **Offline Mode** - Favorites work offline, but search and chatbot require internet
5. **Performance** - Images are lazy-loaded for better performance
6. **Dark Mode** - Reduces eye strain in low-light environments
7. **Chatbot Responses** - Responses depend on Gemini API availability and your connection

## Troubleshooting

### Movies Not Loading
- Check if your API keys are correctly set in `.env`
- Verify your internet connection
- Check browser console for errors

### Dark Mode Not Working
- Clear localStorage and refresh
- Check browser's system preferences

### Favorites Not Saving
- Ensure localStorage is enabled in browser
- Check if you're in private/incognito mode

### Chatbot Not Responding
- Verify `VITE_GEMINI_API_KEY` is set correctly in `.env`
- Check if your Gemini API key is active and has available quota
- Ensure you have a stable internet connection
- Check browser console for API errors

### About Developer Page Issues
- Ensure profile image exists at `/public/assets/NarenSJ.jpg`
- Clear browser cache if images don't load

## Build for Production

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `/dist` directory.

## License

This project is for educational purposes. TMDB API and Google Gemini API usage subject to their respective terms of service.

## Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- AI powered by [Google Gemini API](https://aistudio.google.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Motion (Framer Motion)](https://motion.dev/)
- Built by [Naren S J](https://narensj20.netlify.app)

## Happy Movie Hunting!

---

**Made by:** Naren S J - Full Stack Developer & Cybersecurity Enthusiast  
**Portfolio:** [narensj20.netlify.app](https://narensj20.netlify.app)  
**GitHub:** [github.com/Naren1520](https://github.com/Naren1520)  
**LinkedIn:** [linkedin.com/in/narensj20](https://www.linkedin.com/in/narensj20/)
