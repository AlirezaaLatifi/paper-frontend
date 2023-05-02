import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default async ({ mode }) => {
  // Load environment variables into the Node.js process environment
  const env = await loadEnv(mode, process.cwd());

  return defineConfig({
    // Use environment variables in your Vite config
    base: env.VITE_BASE_URL,
    plugins: [react()],
  });
};
