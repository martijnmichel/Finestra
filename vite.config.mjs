import { config as loadEnv } from "dotenv";
import { defineConfig, loadEnv as viteLoadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { telefunc } from "telefunc/vite";

loadEnv({ path: ".env.local" });
loadEnv();

/**
 * telefunc@0.3.1 Vite middleware matches `url === '/_telefunc'` exactly, but the
 * client posts to `/_telefunc?_telefunc=txt`. Strip the query so the middleware
 * still handles the request (request kind is also sent via header).
 */
function telefuncQueryCompat() {
  const strip = (middlewares) => {
    middlewares.use((req, _res, next) => {
      const raw = req.originalUrl || req.url || "";
      const pathname = raw.split("?")[0];
      if (pathname === "/_telefunc" && raw.includes("?")) {
        req.url = "/_telefunc";
        if ("originalUrl" in req) req.originalUrl = "/_telefunc";
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
    plugins: [telefuncQueryCompat(), react(), tailwindcss(), telefunc()],
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

