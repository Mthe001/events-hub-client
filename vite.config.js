import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path'; // Import path module
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Resolve __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Now path is properly defined
    },
  },
});
