import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    minify: true, // Keep readable for analysis
  },
});
