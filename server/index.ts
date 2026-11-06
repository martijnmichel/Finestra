import { config as loadEnv } from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TELEFUNC_URL, telefunc } from "./telefuncSetup";

loadEnv({ path: ".env.local" });
loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOST || "0.0.0.0";

const app = new Hono();

app.all(TELEFUNC_URL, async (c) => {
  const response = await telefunc.serve({ request: c.req.raw });
  return response ?? c.notFound();
});

app.use("/*", serveStatic({ root: dist }));
app.get("*", async (c) => {
  try {
    const html = await readFile(path.join(dist, "index.html"), "utf8");
    return c.html(html);
  } catch {
    return c.notFound();
  }
});

console.log(`MartijnOS listening on http://${hostname}:${port}`);
const server = serve({ fetch: app.fetch, port, hostname });
telefunc.installWebSocket(server);
