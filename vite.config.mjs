import { config as loadEnv } from "dotenv";
import { defineConfig, loadEnv as viteLoadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { telefunc } from "telefunc/vite";

loadEnv({ path: ".env.local" });
loadEnv();

/** Keep in sync with server/telefuncSetup.ts and main.tsx */
const TELEFUNC_URL = "/api/telefunc";

/**
 * telefunc@0.3.1 Vite middleware matches `url === telefuncUrl` exactly, but the
 * client posts to `${telefuncUrl}?_telefunc=txt`. Strip the query so the
 * middleware still handles the request (request kind is also sent via header).
 */
function telefuncQueryCompat() {
  const strip = (middlewares) => {
    middlewares.use((req, _res, next) => {
      const raw = req.originalUrl || req.url || "";
      const pathname = raw.split("?")[0];
      if (pathname === TELEFUNC_URL && raw.includes("?")) {
        req.url = TELEFUNC_URL;
        if ("originalUrl" in req) req.originalUrl = TELEFUNC_URL;
      }
      next();
    });
  };

  return {
    name: "telefunc-query-compat",
    enforce: "pre",
    configureServer(server) {
      strip(server.middlewares);
    },
    configurePreviewServer(server) {
      strip(server.middlewares);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ensure server-only secrets are on process.env for telefunc middleware
  const env = viteLoadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }

  return {
    plugins: [
      telefuncQueryCompat(),
      react(),
      tailwindcss(),
      telefunc({ telefuncUrl: TELEFUNC_URL }),
    ],
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
  };
});

