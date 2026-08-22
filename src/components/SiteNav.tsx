import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-500",
        scrolled && "border-border bg-background/85 backdrop-blur-md",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-[88rem] items-center justify-between px-6 transition-all duration-500 md:px-10",
          scrolled ? "h-14" : "h-20",
        )}
      >
        <Link
          to="/"
          className="font-display text-[0.95rem] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85 md:inline-block"
          >
            Let's Work Together
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 p-2 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background px-6 pb-10 pt-6 md:hidden"
      >
        <ul className="flex flex-col gap-5">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl tracking-tight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-8 block bg-primary px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"
        >
          Let's Work Together
        </a>
      </div>
    </header>
  );
}
