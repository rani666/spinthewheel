import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spinthewheel/',
  plugins: [react(), viteSingleFile()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
