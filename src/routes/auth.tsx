import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Admin sign in — Dustan Kibaja";
const DESCRIPTION = "Private sign in for managing artwork on the Dustan Kibaja portfolio.";

export const Route = createFileRoute("/auth")({
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
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (signUpError) setError(signUpError.message);
      else if (data.session) navigate({ to: "/admin", replace: true });
      else setMessage("Check your email to confirm the account, then sign in.");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) setError(signInError.message);
      else navigate({ to: "/admin", replace: true });
    }
    setBusy(false);
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-32">
      <p className="eyebrow">Private area</p>
      <h1 className="mt-4 font-display text-3xl font-medium">
        {mode === "signin" ? "Sign in" : "Create the admin account"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Manage the artwork shown across the portfolio.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <label className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-2 w-full border border-border bg-secondary px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="mt-2 w-full border border-border bg-secondary px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-none focus:border-foreground"
          />
        </label>

        {error ? <p className="text-sm text-signal">{error}</p> : null}
        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setMessage(null);
        }}
        className="mt-6 self-start text-xs uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 hover:underline"
      >
        {mode === "signin" ? "First time? Create the admin account" : "Back to sign in"}
      </button>
    </section>
  );
}
