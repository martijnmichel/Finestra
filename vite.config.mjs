import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  define: {
    global: "globalThis",
  },
  // Vite 8 / Rolldown: keepNames preserves Function.name if anything still reads it.
  // App identity should use Application.appName / Applications keys (not Class.name).
  build: {
    rolldownOptions: {
      output: {
        keepNames: true,
      },
    },
  },
});
