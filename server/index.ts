import { config as loadEnv } from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Telefunc } from "telefunc/node";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

loadEnv({ path: ".env.local" });
loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT) || 3000;

const app = new Hono();
const telefunc = new Telefunc();

app.all("/_telefunc", async (c) => {
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

console.log(`MartijnOS listening on http://localhost:${port}`);
const server = serve({ fetch: app.fetch, port });
telefunc.installWebSocket(server);
