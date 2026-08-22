import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="rule-top">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-base font-semibold tracking-tight">
            {site.name} © 2026
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{site.title}</p>
          <p className="text-sm text-muted-foreground">{site.location}</p>
        </div>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          <li>
            <a href="/#work" className="link-underline hover:text-foreground">
              Work
            </a>
          </li>
          <li>
            <a href="/#about" className="link-underline hover:text-foreground">
              About
            </a>
          </li>
          <li>
            <a href="/#contact" className="link-underline hover:text-foreground">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
