import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/paper-frontend/',
  plugins: [react()],
  // plugins: [react(), eslint()],
});
