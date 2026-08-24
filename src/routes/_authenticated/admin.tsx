import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { imageSlots, storageImageUrl, type SiteImageMap } from "@/lib/site-images";

const TITLE = "Artwork manager — Dustan Kibaja";
const DESCRIPTION = "Private admin panel for uploading portfolio artwork.";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const images = useQuery({
    queryKey: ["admin", "site-images"],
    queryFn: async (): Promise<SiteImageMap> => {
      const { data, error: qErr } = await supabase
        .from("site_images")
        .select("slot_key, url");
      if (qErr) throw qErr;
      const map: SiteImageMap = {};
      for (const row of data ?? []) map[row.slot_key] = row.url;
      return map;
    },
  });

  const isAdmin = useQuery({
    queryKey: ["admin", "is-admin"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return Boolean(data);
    },
  });

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["admin", "site-images"] });
    await queryClient.invalidateQueries({ queryKey: ["site-images"] });
  }

  async function upload(slotKey: string, file: File) {
    setBusySlot(slotKey);
    setError(null);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${slotKey.replace(/:/g, "/")}/${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (upErr) {
      setError(upErr.message);
      setBusySlot(null);
      return;
    }

    const { error: dbErr } = await supabase
      .from("site_images")
      .upsert({ slot_key: slotKey, url: storageImageUrl(path), updated_at: new Date().toISOString() });

    if (dbErr) setError(dbErr.message);
    else await refresh();
    setBusySlot(null);
  }

  async function clear(slotKey: string) {
    setBusySlot(slotKey);
    setError(null);
    const { error: delErr } = await supabase
      .from("site_images")
      .delete()
      .eq("slot_key", slotKey);
    if (delErr) setError(delErr.message);
    else await refresh();
    setBusySlot(null);
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const map = images.data ?? {};

  return (
    <section className="mx-auto max-w-[70rem] px-6 py-28 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 font-display text-4xl font-medium">Artwork manager</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Upload an image for any slot on the site. Empty slots keep showing the labelled
            placeholder.
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-accent"
        >
          Sign out
        </button>
      </div>

      {isAdmin.data === false ? (
        <p className="mt-10 border border-border bg-secondary p-5 text-sm text-muted-foreground">
          This account does not have admin access, so uploads will be rejected.
        </p>
      ) : null}
      {error ? <p className="mt-8 text-sm text-signal">{error}</p> : null}

      <div className="mt-14 space-y-16">
        {imageSlots.map((project) => (
          <div key={project.slug}>
            <h2 className="font-display text-2xl font-medium">{project.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[project.cover, ...project.gallery].map((slot, i) => (
                <SlotCard
                  key={slot.key}
                  slotKey={slot.key}
                  label={i === 0 ? "Cover" : `Gallery ${i}`}
                  alt={slot.image.alt}
                  url={map[slot.key]}
                  busy={busySlot === slot.key}
                  onUpload={(file) => upload(slot.key, file)}
                  onClear={() => clear(slot.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SlotCard({
  slotKey,
  label,
  alt,
  url,
  busy,
  onUpload,
  onClear,
}: {
  slotKey: string;
  label: string;
  alt: string;
  url?: string;
  busy: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  return (
    <div className="border border-border bg-secondary/50 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow">{label}</span>
        {url ? (
          <button
            type="button"
            onClick={onClear}
            disabled={busy}
            className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        ) : null}
      </div>

      <div className="mt-3 aspect-[4/5] w-full overflow-hidden bg-secondary">
        {url ? (
          <img src={url} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="placeholder-hatch flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
            {alt}
          </div>
        )}
      </div>

      <label className="mt-4 block cursor-pointer text-xs text-muted-foreground">
        <span className="sr-only">Upload image for {slotKey}</span>
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = "";
          }}
          className="w-full text-xs file:mr-3 file:border file:border-border file:bg-background file:px-3 file:py-2 file:text-[0.65rem] file:uppercase file:tracking-[0.14em] file:text-foreground"
        />
        {busy ? <span className="mt-2 block">Uploading…</span> : null}
      </label>
    </div>
  );
}
