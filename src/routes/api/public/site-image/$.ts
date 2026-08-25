import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * Streams a file from the private `site-images` bucket so the public site can
 * display admin-uploaded artwork without signed URLs.
 */
export const Route = createFileRoute("/api/public/site-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat;
        if (!path) return new Response("Not found", { status: 404 });

        const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"];
        const url = process.env["SUPABASE_URL"];
        if (!key || !url) {
          return new Response("Image service is not configured", { status: 503 });
        }
        const client = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
                h.delete("Authorization");
              }
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });

        const { data, error } = await client.storage.from("site-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        const buffer = await data.arrayBuffer();
        return new Response(buffer, {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "content-length": buffer.byteLength.toString(),
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
