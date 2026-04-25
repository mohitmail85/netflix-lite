# Development Guide

## Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- pnpm (installed automatically or run `npm install -g pnpm`)

## Project Structure

This is a pnpm monorepo with the following packages:

```
packages/
├── shared-types/      # Shared TypeScript types
├── shared-data/       # Shared mock data and utilities
├── shared-components/ # Shared React components
├── host/             # Main app (Home, Details pages)
└── search/           # Search microfrontend
```

## Installation

```bash
pnpm install
```

## Development Modes

### Run Both Apps in Parallel (Recommended)

```bash
pnpm dev:all
```

This starts:
- Host app on http://localhost:5173
- Search MFE on http://localhost:5174

### Run Individual Apps

```bash
# Run host only
pnpm dev:host

# Run search only (standalone mode)
pnpm dev:search
```

## Building

### Build All Packages

```bash
pnpm build:all
```

### Build Individual Packages

```bash
# Build shared packages
pnpm build:shared

# Build host
pnpm build:host

# Build search
pnpm build:search
```

## Preview Production Builds

```bash
# Preview host
pnpm preview:host

# Preview search
pnpm preview:search
```

## Module Federation

The search module is loaded dynamically at runtime using Vite Module Federation:

- **Host** exposes the main app shell
- **Search** exposes the SearchPage component
- Shared dependencies (React, React Router) are loaded once

### Environment Variables

Create `.env.local` files in packages as needed:

**packages/host/.env.local**
```
VITE_SEARCH_REMOTE_URL=http://localhost:5174/assets/remoteEntry.js
```

**packages/search/.env.local**
```
VITE_BASE_URL=/search/
```

## Linting

```bash
pnpm lint
```

## Troubleshooting

### Node Version Error

If you see "You are using Node.js 16.x.x. Vite requires Node.js version 20.19+ or 22.12+":

1. Upgrade Node.js to 20.19+ or 22.12+
2. Reinstall dependencies: `pnpm install`

### Module Not Found

If you see module resolution errors:

1. Ensure all packages are built: `pnpm build:shared`
2. Restart dev servers

### CORS Errors

If you see CORS errors when loading the search module:

1. Ensure both servers are running (`pnpm dev:all`)
2. Check that ports 5173 and 5174 are not blocked

## Architecture Notes

- Components are shared via source (not built), allowing hot reload
- Types and data are built into `dist/` folders
- CSS is imported directly from shared-components source files
- Module Federation handles runtime loading of the search MFE
