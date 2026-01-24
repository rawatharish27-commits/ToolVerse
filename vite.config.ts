
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
      // Prevents "process is not defined" in the browser
      'process.env': {},
      'process.version': JSON.stringify('v18.0.0'),
      // Fallback for libraries expecting a global 'global'
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
