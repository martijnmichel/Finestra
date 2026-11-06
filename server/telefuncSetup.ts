import { config, __decorateTelefunction } from "telefunc";
import { Telefunc } from "telefunc/node";
import { submitRequest } from "../src/applications/request/submitRequest.telefunc";

/** Must match client `config.telefuncUrl` (Vercel API route path). */
export const TELEFUNC_URL = "/api/telefunc";

config.telefuncUrl = TELEFUNC_URL;

// Vite SPA builds don't emit dist/server/entry.js, so register telefunctions
// explicitly for Node/Vercel (same path the client sends).
__decorateTelefunction(
  submitRequest,
  "submitRequest",
  "/src/applications/request/submitRequest.telefunc.ts",
  process.cwd()
);

export const telefunc = new Telefunc();
