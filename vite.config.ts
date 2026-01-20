import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensure paths are relative for Cloudflare Pages subdomains
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['qrcode', 'pdf-lib', 'xlsx', 'jspdf']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});