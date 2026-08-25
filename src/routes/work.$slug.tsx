import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WorkFrame } from "@/components/WorkFrame";
import { getProject, getProjectNeighbours, type Project } from "@/data/projects";
import { siteImagesQuery } from "@/lib/site-images.query";
import { applyImages } from "@/lib/site-images";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params, context }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    await context.queryClient.ensureQueryData(siteImagesQuery);
    return { project, ...getProjectNeighbours(params.slug) };
  },

  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Dustan Kibaja" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.project;
    const title = `${p.title} — ${p.categories[0]} Design by Dustan Kibaja`;
    const description = p.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

const shell = "mx-auto max-w-[88rem] px-6 md:px-10";

function ProjectNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl font-medium">Project unavailable</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This project may have been renamed or removed.
      </p>
      <Link
        to="/"
        className="mt-8 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"
      >
        Back to portfolio
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { project: staticProject, prev, next } = Route.useLoaderData() as {
    project: Project;
    prev: Project;
    next: Project;
  };
  const { data: imageMap } = useSuspenseQuery(siteImagesQuery);
  const project = applyImages(staticProject, imageMap);
  const [lightbox, setLightbox] = useState<number | null>(null);


  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const spanClass = (span?: string) =>
    span === "full" ? "md:col-span-6" : span === "half" ? "md:col-span-3" : "md:col-span-2";

  return (
    <article className="pt-28 md:pt-36">
      <header className={shell}>
        <Reveal>
          <Link
            to="/"
            hash="work"
            className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> All work
          </Link>
          <p className="eyebrow mt-10">
            {project.index} · {project.categories.join(" · ")}
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] font-medium leading-[1.03] md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-14 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="eyebrow">Company</dt>
              <dd className="mt-2 font-display text-lg">{project.company}</dd>
            </div>
            <div>
              <dt className="eyebrow">Industry</dt>
              <dd className="mt-2 font-display text-lg">{project.industry}</dd>
            </div>
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-2 font-display text-lg">Graphic Designer</dd>
            </div>
            <div>
              <dt className="eyebrow">Duration</dt>
              <dd className="mt-2 font-display text-lg">{project.duration}</dd>
            </div>
          </dl>
        </Reveal>
      </header>

      <section className={`${shell} mt-16 md:mt-24`}>
        <Reveal>
          <WorkFrame
            priority
            image={{ ...project.cover, ratio: "16/9" }}
            label={`${project.company} — key visual`}
          />
        </Reveal>
      </section>

      <section className={`${shell} mt-16 grid gap-12 md:mt-24 md:grid-cols-12`}>
        <Reveal className="md:col-span-7">
          <h2 className="font-display text-2xl font-medium md:text-3xl">Overview</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.overview}
          </p>
          <h2 className="mt-12 font-display text-2xl font-medium md:text-3xl">Design approach</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.approach}
          </p>
          <h2 className="mt-12 font-display text-2xl font-medium md:text-3xl">Role</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.role}
          </p>
        </Reveal>
        <Reveal delay={100} className="md:col-span-5 md:col-start-9">
          <h2 className="eyebrow">Services &amp; responsibilities</h2>
          <ul className="mt-6 border-t border-border">
            {project.responsibilities.map((r) => (
              <li key={r} className="border-b border-border py-3 text-sm">
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className={`${shell} mt-20 md:mt-28`}>
        <Reveal>
          <h2 className="eyebrow">Visual gallery</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Final work for {project.company}. Placeholder frames are ready to be replaced with
            the original design files.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-6 md:gap-6">
          {project.gallery.map((img, i) => (
            <Reveal key={img.alt} delay={(i % 3) * 60} className={spanClass(img.span)}>
              <WorkFrame
                image={img}
                label={`${project.company} — artwork`}
                onClick={() => setLightbox(i)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <nav
        aria-label="Project navigation"
        className={`${shell} mt-24 flex items-center justify-between gap-6 border-t border-border py-10 md:mt-32`}
      >
        <Link to="/work/$slug" params={{ slug: prev.slug }} className="group max-w-[45%]">
          <span className="eyebrow flex items-center gap-2">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="mt-2 block font-display text-xl md:text-2xl">{prev.title}</span>
        </Link>
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group max-w-[45%] text-right"
        >
          <span className="eyebrow flex items-center justify-end gap-2">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 block font-display text-xl md:text-2xl">{next.title}</span>
        </Link>
      </nav>

      {lightbox !== null && project.gallery[lightbox]?.src ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.gallery[lightbox].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 p-2 text-background"
          >
            <X className="size-6" />
          </button>
          <img
            src={project.gallery[lightbox].src}
            alt={project.gallery[lightbox].alt}
            className="max-h-[88vh] w-auto max-w-full object-contain"
          />
        </div>
      ) : null}
    </article>
  );
}
