import { defineConfig } from "vite";
import path from 'path';
import react from "@vitejs/plugin-react";
import { telefunc } from "telefunc/vite";
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    minifyIdentifiers: false,
  },
});
