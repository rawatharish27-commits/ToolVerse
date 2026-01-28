import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

/**
 * ToolVerse Production Build Engine
 * Ensures environment variables are handled securely and 
 * browser-side globals are correctly shimmed.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Correctly pass the API_KEY from the environment
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.version': JSON.stringify('v18.0.0'),
      'global': 'globalThis',
    },
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: mode !== 'production',
      rollupOptions: {
        input: {
          main: './index.html'
        }
      }
    },
    server: {
      port: 3000,
      host: true
    }
  };
});