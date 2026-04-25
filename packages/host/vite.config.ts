import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        search: {
          external: process.env.VITE_SEARCH_REMOTE_URL || 'http://localhost:5174/assets/remoteEntry.js',
          format: 'esm',
          from: 'vite'
        }
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^7.12.0'
        }
      }
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 5173,
    strictPort: true
  }
})
