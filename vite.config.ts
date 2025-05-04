import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/json-beautifier/" // adjust for GitHub Pages if needed
});