import { telefunc } from "../server/telefuncSetup";

/**
 * Vercel serverless handler for Telefunc.
 * Client posts to /api/telefunc (see telefuncUrl in main.tsx / vite.config).
 */
export default {
  async fetch(request: Request) {
    const response = await telefunc.serve({ request });
    return response ?? new Response("Not Found", { status: 404 });
  },
};
