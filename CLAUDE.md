# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Netflix Lite is a simplified Netflix-style web application built with React 19, TypeScript, and Vite. This is Phase 1 of the project with static/mock data and no authentication. The codebase is intentionally structured to facilitate future microfrontend refactoring.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Lint code
npm run lint

# Type-check TypeScript
tsc -b

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Microfrontend-Ready Structure

The project is organized with future microfrontend architecture in mind:

- **Pages as Boundaries**: Each page (`Home`, `Details`) is in its own folder under `src/pages/` and represents a potential future microfrontend
- **Shared Components**: Reusable components (`Header`, `MovieCard`, `MovieRow`) live in `src/components/` and would become a shared component library
- **Centralized Routing**: All routes are defined in `src/app/routes.tsx` for easy migration to Module Federation or similar
- **Data Layer**: Mock data lives in `src/data/movies.ts` with helper functions (`getFeaturedMovie()`, `getMovieById()`) - ready to be replaced with API calls

### Key Type Definitions

Located in `src/types/movie.ts`:
- `Movie`: Core movie entity with id, title, description, genre[], rating, year, posterUrl, heroImageUrl, trailerUrl
- `MovieCategory`: Groups movies by category with id, title, and movies array

### Component Organization

Each component follows this pattern:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.css
└── index.ts (re-exports the component)
```

### Data Flow

1. Mock data defined in `src/data/movies.ts` as a flat array
2. `movieCategories` array references movies by index for categorization
3. Pages import data helper functions (`getFeaturedMovie`, `getMovieById`)
4. Components receive data via props (no global state management yet)

### Routing

- Two routes defined in `src/app/routes.tsx`:
  - `/` - Home page with hero section and movie rows
  - `/details/:id` - Movie details page
- Navigation handled via React Router's `useNavigate` hook

## Styling

- CSS files colocated with components
- Global styles in `src/index.css` and `src/app/App.css`
- Dark Netflix-inspired theme with CSS variables
- Desktop-first responsive design
- No CSS preprocessors or CSS-in-JS libraries

## Important Constraints

- **No Backend**: All data is static/mock - uses placeholder Unsplash images
- **No Authentication**: No user system or login required
- **UI-Only Features**: Watchlist toggle and trailer playback are placeholders with no persistence
- **Node Requirements**: Requires Node.js 20.19+ or 22.12+ (Vite requirement)

## Future Considerations (Not Implemented)

The README mentions these are planned but NOT in Phase 1:
- Microfrontend architecture with Module Federation
- Backend integration
- User authentication
- State management (Redux/Zustand)
- Server-side rendering
- Search functionality
- Watchlist persistence
