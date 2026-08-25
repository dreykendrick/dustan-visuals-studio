import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { WorkFrame } from "@/components/WorkFrame";
import { experience, languages, site, skills, software } from "@/data/site";
import { siteImagesQuery } from "@/lib/site-images.query";
import { applyImagesToAll } from "@/lib/site-images";

const TITLE = "Dustan Kibaja — Graphic & Visual Designer";
const DESCRIPTION =
  "Portfolio of Dustan Kibaja, a Graphic & Visual Designer based in Dar es Salaam, Tanzania, specializing in branding, social media, campaigns, digital design, and visual communication.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteImagesQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const shell = "mx-auto max-w-[88rem] px-6 md:px-10";

const FALLBACK_COVER = { alt: "Selected design work by Dustan Kibaja" };

function Index() {
  const { data: imageMap } = useSuspenseQuery(siteImagesQuery);
  const projects = applyImagesToAll(imageMap);
  const cover = (i: number) => projects[i]?.cover ?? FALLBACK_COVER;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <span aria-hidden="true" className="glow-orb -left-24 top-10 size-[26rem]" />
        <span
          aria-hidden="true"
          className="glow-orb right-0 top-52 size-[22rem] [animation-delay:-4s]"
        />
        <div className={`relative ${shell}`}>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>

              <Reveal>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mr-1 inline-block size-1.5 rounded-full bg-signal"
                  />
                  Based in {site.location} · {site.status}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-7 font-display text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
                  Graphic &amp; Visual Designer creating visuals that make brands impossible to
                  ignore.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  I design campaigns, digital experiences, social content, and visual identities
                  for brands that want to communicate clearly and connect with their audience.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85"
                  >
                    View My Work
                  </a>
                  <a
                    href="#contact"
                    className="border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-accent"
                  >
                    Let's Work Together
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hero collage — placeholders until real work is added */}
            <Reveal delay={200} className="grid grid-cols-2 gap-3 self-end sm:gap-4">
              <WorkFrame
                priority
                image={{ ...cover(0), ratio: "3/4" }}
                label="Featured work"
                className="float-slow col-span-1"
              />
              <div className="flex flex-col gap-3 sm:gap-4">
                <WorkFrame
                  priority
                  image={{ ...cover(1), ratio: "1/1" }}
                  label="Featured work"
                  className="float-slow [animation-delay:-2.5s]"
                />
                <WorkFrame
                  image={{ ...cover(2), ratio: "4/3" }}
                  label="Featured work"
                  className="float-slow [animation-delay:-5s]"
                />
              </div>
            </Reveal>

          </div>

          <div className="mt-16 flex items-center gap-3 text-xs text-muted-foreground md:mt-24">
            <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
            <span className="eyebrow">Scroll</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="rule-top py-12 md:py-16">
        <div className={`${shell} flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between`}>
          <Reveal>
            <h2 className="max-w-md font-display text-xl font-medium md:text-2xl">
              Trusted with visual design across multiple industries.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:max-w-[52%]">
            <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              <ul className="marquee-track items-center gap-x-8">
                {[...site.companies, ...site.companies].map((c, i) => (
                  <li
                    key={`${c}-${i}`}
                    aria-hidden={i >= site.companies.length ? "true" : undefined}
                    className="whitespace-nowrap font-display text-base tracking-tight text-muted-foreground transition-colors hover:text-foreground md:text-lg"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="rule-top scroll-mt-24 py-20 md:py-28">
        <div className={shell}>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] md:text-5xl">
              A selection of campaigns, visual content, digital design, and creative work
              developed for real brands and projects.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-24">
            {projects.map((p, i) => {
              const layouts = [
                "md:col-span-7",
                "md:col-span-5 md:mt-24",
                "md:col-span-5",
                "md:col-span-7 md:mt-24",
              ];
              return (
                <Reveal key={p.slug} className={layouts[i % layouts.length] ?? ""}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="hover-lift group block"
                    aria-label={`View project: ${p.title}`}
                  >
                    <WorkFrame
                      image={{ ...p.cover, ratio: i % 2 === 0 ? "4/3" : "4/5" }}
                      label={`${p.index} — ${p.company}`}
                    />
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <p className="eyebrow">
                          {p.index} · {p.duration}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-medium md:text-3xl">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {p.categories.join(" · ")}
                        </p>
                        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                      </div>
                      <span className="mt-1 flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
                        View
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="rule-top scroll-mt-24 py-20 md:py-28">
        <div className={`${shell} grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <Reveal>
            <WorkFrame
              image={{ alt: "Professional portrait of Dustan Kibaja", ratio: "4/5" }}
              label="Portrait placeholder"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] md:text-5xl">
                Designing with purpose, not just aesthetics.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I'm Dustan Kibaja, a Graphic &amp; Visual Designer based in Dar es Salaam,
                  Tanzania.
                </p>
                <p>
                  For the past 2+ years, I've worked with companies including KB Softwares,
                  Albastini, Gemineye, and Winger App, taking responsibility for their visual
                  design and creative communication.
                </p>
                <p>
                  My work spans social media, campaigns, events, promotional content, branding,
                  and digital experiences. I enjoy taking an idea or business objective and
                  turning it into visual communication that people notice, understand, and
                  remember.
                </p>
                <p>
                  I'm currently looking for opportunities where I can contribute to a creative
                  team, work remotely or in a hybrid environment, and continue growing as a
                  designer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <dl className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Education</dt>
                  <dd className="mt-2 font-display text-lg">Computer Science</dd>
                  <dd className="text-sm text-muted-foreground">University Studies</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    Completed university-level studies in Computer Science.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Languages</dt>
                  {languages.map((l) => (
                    <dd key={l.name} className="mt-2 text-sm">
                      <span className="font-display text-lg">{l.name}</span>
                      <span className="text-muted-foreground"> — {l.level}</span>
                    </dd>
                  ))}
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="rule-top py-20 md:py-28">
        <div className={shell}>
          <Reveal>
            <p className="eyebrow">What I Do</p>
          </Reveal>
          <div className="mt-10 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 50}
                className="hover-lift border-b border-border px-0 py-8 hover:bg-secondary/40 md:px-8 md:odd:border-r lg:px-10 lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r md:[&:first-child]:pl-0 lg:[&:first-child]:pl-0"
              >
                <h3 className="font-display text-xl font-medium md:text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* SOFTWARE */}
          <Reveal className="mt-20">
            <p className="eyebrow">Software</p>
            <ul className="mt-8 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {software.map((t) => (
                <li
                  key={t.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-4 transition-all duration-500 hover:border-signal hover:px-2"
                >
                  <span className="font-display text-base md:text-lg">{t.name}</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {t.level}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="rule-top scroll-mt-24 py-20 md:py-28">
        <div className={shell}>
          <Reveal>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.08] md:text-5xl">
              2+ years of end-to-end design for real companies.
            </h2>
          </Reveal>
          <ol className="mt-14 border-t border-border">
            {experience.map((e, i) => (
              <Reveal
                key={e.company}
                delay={i * 60}
                as="li"
                className="group grid gap-4 border-b border-border py-8 transition-colors duration-500 hover:bg-secondary/40 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl font-medium">{e.company}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {e.role} · {e.duration}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">
                  {e.body}
                </p>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    to="/work/$slug"
                    params={{ slug: e.slug }}
                    className="link-underline text-xs font-semibold uppercase tracking-[0.14em]"
                  >
                    See work
                  </Link>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className={shell}>
          <Reveal>
            <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.08] md:text-5xl">
              Have a project, opportunity, or idea? Let's create something great.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-70">
              I'm currently open to remote and hybrid Graphic Design, Visual Design, Marketing
              Design, Brand Design, and Creative Design opportunities.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="bg-background px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-opacity hover:opacity-85"
              >
                Get In Touch
              </a>
              <a
                href="#work"
                className="border border-primary-foreground/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-primary-foreground/10"
              >
                View My Work
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 py-20 md:py-28">
        <div className={`${shell} grid gap-12 md:grid-cols-2`}>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">{site.name}</h2>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {site.location}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex items-center gap-3 font-display text-lg md:text-2xl"
                >
                  <Mail className="size-5 shrink-0" aria-hidden="true" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="link-underline inline-flex items-center gap-3 font-display text-lg md:text-2xl"
                >
                  <Phone className="size-5 shrink-0" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
            </ul>
            {site.socials.some((s) => s.url) ? (
              <ul className="mt-10 flex flex-wrap gap-6">
                {site.socials
                  .filter((s) => s.url)
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline text-sm"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
