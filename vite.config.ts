import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { telefunc } from "telefunc/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    minifyIdentifiers: false,
  },
});
