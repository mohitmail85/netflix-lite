import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'search',
      filename: 'remoteEntry.js',
      exposes: {
        './SearchPage': './src/SearchPage.tsx',
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
  base: process.env.VITE_BASE_URL || '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5174,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 5174,
    strictPort: true,
    cors: true
  }
})
