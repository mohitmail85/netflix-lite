# Netflix Lite (Phase 1)

A simplified Netflix-style web application built with React, TypeScript, and Vite.

## Features

- **Home/Browse Page**: Netflix-style rows with horizontal scrolling
  - Featured hero section
  - Multiple movie categories (Trending, Popular, Action, Drama)
  - Responsive movie cards with hover effects

- **Details Page**: Individual movie details
  - Large hero banner
  - Movie information (title, rating, year, genres, description)
  - Play Trailer button with modal
  - Add to Watchlist functionality (UI only)

- **Navigation**: React Router-based routing
  - Fixed header with navigation
  - Smooth transitions between pages

## Tech Stack

- **React 18**: Modern React with functional components
- **TypeScript**: Type-safe code
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **CSS Modules**: Component-scoped styling

## Project Structure

```
src/
├── app/
│   ├── App.tsx          # Main app component with router
│   ├── App.css          # App-level styles
│   └── routes.tsx       # Route definitions
├── pages/
│   ├── Home/            # Home/Browse page
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   └── index.ts
│   └── Details/         # Movie details page
│       ├── Details.tsx
│       ├── Details.css
│       └── index.ts
├── components/
│   ├── Header/          # Global header
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   └── index.ts
│   ├── MovieCard/       # Movie card component
│   │   ├── MovieCard.tsx
│   │   ├── MovieCard.css
│   │   └── index.ts
│   └── MovieRow/        # Horizontal movie row
│       ├── MovieRow.tsx
│       ├── MovieRow.css
│       └── index.ts
├── data/
│   └── movies.ts        # Mock movie data
├── types/
│   └── movie.ts         # TypeScript interfaces
├── index.css            # Global styles
└── main.tsx             # App entry point
```

## Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (Required by Vite)
- npm 8.0+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design Decisions

### Architecture for Future Microfrontends

The codebase is structured to facilitate future microfrontend refactoring:

- **Pages as Boundaries**: Each page (Home, Details) is in its own folder and could become a separate microfrontend
- **Shared Components**: Reusable components (Header, MovieCard, MovieRow) in a dedicated folder
- **Centralized Routing**: Routes defined in a single file for easy migration
- **Type Safety**: TypeScript interfaces ensure contract consistency
- **Isolated Data**: Mock data in a separate layer for easy backend integration

### Styling

- Dark Netflix-inspired theme
- Responsive design (desktop-first)
- CSS files colocated with components
- Global styles for consistency
- Smooth hover effects and transitions

## Future Enhancements (Not in Phase 1)

- Microfrontend architecture with Module Federation
- Backend integration for real data
- User authentication
- State management (Redux/Zustand)
- Server-side rendering
- Search functionality
- User profiles and watchlist persistence

## Notes

- No authentication required
- Uses mock/static data
- Trailer playback is placeholder only
- Watchlist is UI-only (no persistence)
