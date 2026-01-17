/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    // Note: Environment variables are now only used server-side in API routes
    // Client-side code should call /api/gemini instead of using the API key directly
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Removed: API key exposure via define (security fix)
      // Old code exposed GEMINI_API_KEY to client bundle
      define: {
        // Add any other safe client-side env vars here if needed
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // React core
              'vendor-react': ['react', 'react-dom'],
              // React Router
              'vendor-router': ['react-router-dom'],
              // Three.js ecosystem (largest chunk)
              'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
              // Animation
              'vendor-motion': ['framer-motion'],
              // Google AI
              'vendor-ai': ['@google/genai'],
            },
          },
        },
        chunkSizeWarningLimit: 500,
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest-setup.ts',
        css: true,
      },
    };
});
