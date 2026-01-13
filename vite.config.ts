import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
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
    };
});
