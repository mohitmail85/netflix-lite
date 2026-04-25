# Netflix Lite - Microfrontend Architecture

A Netflix-style web application built with React 19, TypeScript, and Vite, featuring a **Module Federation** microfrontend architecture.

## Architecture

This project demonstrates a production-ready microfrontend setup using **Vite Module Federation**:

- **Host App** (Port 5173): Main application shell with Home and Details pages
- **Search MFE** (Port 5174): Independent search microfrontend loaded at runtime
- **Shared Packages**: Types, data, and components shared across microfrontends

```
packages/
├── host/               # Main app (Home, Details)
├── search/             # Search microfrontend
├── shared-types/       # Shared TypeScript types
├── shared-data/        # Shared mock data
└── shared-components/  # Shared React components
```

## Features

### Host App
- **Home Page**: Netflix-style hero section with movie rows
- **Details Page**: Full movie details with trailer modal
- **Navigation**: React Router with lazy-loaded search module

### Search Microfrontend
- **Real-time Search**: Debounced input (300ms) searching titles and descriptions
- **Advanced Filters**: Genre (multi-select), year range, rating range
- **Results Grid**: Responsive layout with movie cards
- **URL State**: Shareable URLs with filters in query params
- **Standalone Mode**: Can run independently for development

### Shared Components
- **Header**: Global navigation with Home and Search links
- **MovieCard**: Reusable movie card with hover effects
- **MovieRow**: Horizontal scrolling movie rows

## Tech Stack

- **React 19**: Latest React with native metadata support
- **TypeScript**: Full type safety across all packages
- **Vite 7**: Fast build tool with Module Federation
- **React Router 7**: Client-side routing with lazy loading
- **pnpm**: Efficient workspace management
- **Module Federation**: Runtime microfrontend loading
- **AWS**: S3 + CloudFront deployment

## Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 7)
- **pnpm** (automatically installed or run `npm install -g pnpm`)

### Installation

```bash
# Install all workspace dependencies
pnpm install
```

### Development

**Run both apps in parallel (recommended):**
```bash
pnpm dev:all
```

- Host: http://localhost:5173
- Search: http://localhost:5174

**Run individually:**
```bash
pnpm dev:host    # Host only
pnpm dev:search  # Search standalone
```

### Building

```bash
# Build all packages
pnpm build:all

# Build individually
pnpm build:host
pnpm build:search
```

### Preview Production

```bash
pnpm preview:host    # http://localhost:5173
pnpm preview:search  # http://localhost:5174
```

## Project Structure

```
netflix-lite/
├── pnpm-workspace.yaml              # pnpm workspace config
├── package.json                     # Root workspace scripts
├── packages/
│   ├── host/                        # Host application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── App.tsx         # App shell with Module Federation
│   │   │   │   └── routes.tsx      # Lazy loads Search MFE
│   │   │   ├── pages/
│   │   │   │   ├── Home/           # Home page
│   │   │   │   └── Details/        # Details page
│   │   │   └── components/
│   │   │       └── ErrorBoundary/  # MFE error handling
│   │   ├── vite.config.ts          # Module Federation host config
│   │   └── package.json
│   ├── search/                      # Search microfrontend
│   │   ├── src/
│   │   │   ├── SearchPage.tsx      # Main export (exposed to host)
│   │   │   ├── components/
│   │   │   │   ├── SearchInput/    # Debounced search input
│   │   │   │   ├── SearchFilters/  # Genre, year, rating filters
│   │   │   │   └── SearchResults/  # Results grid
│   │   │   ├── hooks/
│   │   │   │   └── useSearch.ts    # Search logic + URL state
│   │   │   └── utils/
│   │   │       └── searchEngine.ts # Filter algorithm
│   │   ├── vite.config.ts          # Module Federation remote config
│   │   └── package.json
│   ├── shared-types/                # Shared TypeScript types
│   │   ├── src/movie.ts            # Movie, MovieCategory
│   │   └── package.json
│   ├── shared-data/                 # Shared data and utilities
│   │   ├── src/movies.ts           # Mock movie data
│   │   └── package.json
│   └── shared-components/           # Shared React components
│       ├── src/
│       │   ├── Header/             # Navigation header
│       │   ├── MovieCard/          # Movie card component
│       │   └── MovieRow/           # Horizontal row component
│       └── package.json
├── DEVELOPMENT.md                   # Development guide
├── DEPLOYMENT.md                    # AWS deployment guide
└── CLAUDE.md                        # AI coding assistant instructions
```

## Module Federation Details

### How It Works

1. **Host** configures Search as a remote module
2. **Search** exposes `SearchPage` component via `remoteEntry.js`
3. **Runtime Loading**: When user navigates to `/search`, host dynamically imports Search MFE
4. **Shared Dependencies**: React, React Router loaded once (singleton)
5. **Error Handling**: ErrorBoundary catches module loading failures

### Configuration

**Host (packages/host/vite.config.ts):**
```typescript
federation({
  name: 'host',
  remotes: {
    search: {
      external: process.env.VITE_SEARCH_REMOTE_URL || 'http://localhost:5174/assets/remoteEntry.js',
      format: 'esm',
      from: 'vite'
    }
  },
  shared: ['react', 'react-dom', 'react-router-dom']
})
```

**Search (packages/search/vite.config.ts):**
```typescript
federation({
  name: 'search',
  filename: 'remoteEntry.js',
  exposes: {
    './SearchPage': './src/SearchPage.tsx'
  },
  shared: ['react', 'react-dom', 'react-router-dom']
})
```

## Deployment

Deployed to **AWS S3 + CloudFront** with two separate workflows:

- **deploy-host.yml**: Deploys host app to S3 root
- **deploy-search.yml**: Deploys search MFE to `/search/` path

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Production URLs

- Host: `https://[cloudfront-domain]/`
- Search Standalone: `https://[cloudfront-domain]/search/`
- Search in Host: Loaded dynamically via Module Federation

## Design Decisions

### Why Microfrontends?

- **Independent Deployment**: Search can be updated without redeploying host
- **Team Autonomy**: Different teams can own different microfrontends
- **Technology Flexibility**: Each MFE can use different versions/libraries
- **Scalability**: Easy to add new modules (Profile, Watchlist, Admin)
- **Performance**: Lazy loading reduces initial bundle size

### Why pnpm Workspaces?

- **Code Sharing**: Share types, data, components across MFEs
- **Single Install**: One `pnpm install` for all packages
- **Fast**: Efficient dependency management with hard links
- **Professional**: Used by large monorepos (Google, Microsoft)

### Why Module Federation vs. Alternatives?

- **Runtime Composition**: No build-time coupling
- **Version Independence**: Each MFE can update dependencies independently
- **Shared Dependencies**: Single React instance across all MFEs
- **Native Vite Support**: `@originjs/vite-plugin-federation`

## Search MFE Features

### Search Input
- 300ms debounce for performance
- Search in movie titles and descriptions
- Clear button for quick reset

### Filters
- **Genres**: Multi-select checkboxes (Action, Drama, Sci-Fi, etc.)
- **Year Range**: Dual sliders (1970-2026)
- **Rating Range**: Dual sliders (0-10)
- **Clear All**: Reset all filters at once

### Results
- Responsive grid (4 cols → 2 cols → mobile)
- Result count display
- Empty state with helpful message
- Click to navigate to movie details

### URL State
- Filters persist in URL: `/search?q=dark&genre=action&yearMin=2000`
- Shareable links with active filters
- Browser back/forward support

## Development Workflow

1. **Start dev servers**: `pnpm dev:all`
2. **Make changes**: Hot reload works in both apps
3. **Test integration**: Navigate to /search in host
4. **Build**: `pnpm build:all`
5. **Preview**: `pnpm preview:host` and test production build

## Testing Module Federation

1. Start both servers: `pnpm dev:all`
2. Open host: http://localhost:5173
3. Click "Search" in header
4. Verify search page loads (check Network tab for remoteEntry.js)
5. Test search functionality
6. Navigate to a movie details page from search results

## Future Enhancements

Potential additional microfrontends:

- **Profile MFE**: User settings, account management
- **Watchlist MFE**: My list, continue watching, watch history
- **Admin Dashboard MFE**: Content management, analytics
- **Live TV MFE**: Streaming channels, live schedule

## Known Limitations (Phase 1)

- Mock data only (no backend)
- No authentication
- Watchlist is UI-only (no persistence)
- Trailer modal is placeholder

## Resources

- [Module Federation Docs](https://module-federation.github.io/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [React 19 Docs](https://react.dev/)
- [Development Guide](./DEVELOPMENT.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes in relevant package(s)
4. Test locally with `pnpm dev:all`
5. Build with `pnpm build:all`
6. Submit pull request

## License

MIT License - See LICENSE file for details

---

Built with Module Federation to demonstrate real-world microfrontend architecture.
