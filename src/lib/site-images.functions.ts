import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";
import type { SiteImageMap } from "@/lib/site-images";

export const getSiteImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteImageMap> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const url = process.env["SUPABASE_URL"]!;

    const client = createClient<Database>(url, key, {
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

    const { data, error } = await client.from("site_images").select("slot_key, url");
    if (error) return {};

    const map: SiteImageMap = {};
    for (const row of data ?? []) map[row.slot_key] = row.url;
    return map;
  },
);

export const siteImagesQuery = queryOptions({
  queryKey: ["site-images"],
  queryFn: () => getSiteImages(),
});
