import type { APIRoute } from "astro";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const CONFIG_FILE_PATH = resolve(process.cwd(), "config/config.json");

const getTokenFromRequest = (request: Request): string | null => {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const tokenHeader = request.headers.get("x-config-token");
  return tokenHeader?.trim() || null;
};

const isValidHttpUrl = (value: string): boolean => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const POST: APIRoute = async ({ request }) => {
  const expectedToken = import.meta.env.CONFIG_UPDATE_TOKEN;

  if (!expectedToken) {
    return new Response(
      JSON.stringify({ error: "Server token is not configured" }),
      {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  const providedToken = getTokenFromRequest(request);
  if (!providedToken || providedToken !== expectedToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  let payload: { url?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const url = payload.url?.trim();
  if (!url || !isValidHttpUrl(url)) {
    return new Response(
      JSON.stringify({
        error: "Field 'url' is required and must be a valid http/https URL",
      }),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  await mkdir(dirname(CONFIG_FILE_PATH), { recursive: true });
  await writeFile(
    CONFIG_FILE_PATH,
    `${JSON.stringify({ apkUrl: url }, null, 2)}\n`,
    "utf-8",
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
