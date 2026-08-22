/**
 * PROJECT DATA MODEL
 * ------------------
 * To add a project: append an object to `projects` below.
 * To use real artwork: set `src` on an image to a file you place in
 * `public/work/` (e.g. "/work/albastini-poster-01.jpg").
 * Any image without `src` renders as a clearly labelled placeholder.
 */

export type WorkImage = {
  /** Public path to the real design file. Leave undefined for a placeholder. */
  src?: string;
  /** Always required — used as alt text and caption. */
  alt: string;
  caption?: string;
  /** Layout hint for the gallery. */
  span?: "full" | "half" | "third";
  /** Aspect ratio, e.g. "4/5", "16/9", "1/1". */
  ratio?: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  company: string;
  industry: string;
  categories: string[];
  year?: string;
  duration: string;
  role: string;
  description: string;
  overview: string;
  approach: string;
  responsibilities: string[];
  cover: WorkImage;
  gallery: WorkImage[];
  featured: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    slug: "winger-app",
    index: "01",
    title: "Winger App",
    company: "Winger App",
    industry: "Digital Product & Technology",
    categories: ["Digital Product", "Brand", "Social Media", "Marketing"],
    duration: "3+ Months",
    role: "Responsible for the company's overall visual design requirements, including digital product communication, social media, promotional graphics, campaigns, and brand visuals.",
    description:
      "Visual design and creative communication for a digital product, including promotional content, social media assets, campaigns, and brand communication.",
    overview:
      "Winger App needed visual communication that explained a digital product clearly while building a recognisable brand presence across social and marketing channels.",
    approach:
      "I worked from the product's core message outward — establishing a consistent visual language for screens, typography and colour, then applying it across promotional graphics, campaign assets and social content so every touchpoint felt like the same product.",
    responsibilities: [
      "Digital product visuals",
      "Brand visuals",
      "Social media content",
      "Promotional graphics",
      "Campaign design",
      "Marketing communication",
    ],
    cover: { alt: "Winger App visual design work by Dustan Kibaja", ratio: "4/5" },
    gallery: [
      { alt: "Winger App brand and product visual", span: "full", ratio: "16/9" },
      { alt: "Winger App social media graphic", span: "half", ratio: "1/1" },
      { alt: "Winger App promotional graphic", span: "half", ratio: "1/1" },
      { alt: "Winger App campaign asset", span: "third", ratio: "4/5" },
      { alt: "Winger App digital marketing asset", span: "third", ratio: "4/5" },
      { alt: "Winger App product communication visual", span: "third", ratio: "4/5" },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "albastini",
    index: "02",
    title: "Albastini",
    company: "Albastini",
    industry: "Sports & Entertainment",
    categories: ["Sports", "Entertainment", "Campaigns", "Events"],
    duration: "1 Year",
    role: "Responsible for the company's graphic design and visual communication across social media, events, campaigns, and promotional activities.",
    description:
      "End-to-end visual design across tournament campaigns, event graphics, promotional posters, and social media content.",
    overview:
      "Albastini required consistent and engaging visual communication for tournaments, events, promotional campaigns, and its digital audience.",
    approach:
      "Tournaments move fast, so I built a repeatable poster and social system — fixed typographic hierarchy, flexible image treatments and clear information zones — that could be produced quickly for each fixture while staying visually consistent across a full season.",
    responsibilities: [
      "Campaign design",
      "Tournament graphics",
      "Event posters",
      "Social media content",
      "Promotional materials",
      "Digital marketing visuals",
      "Creative concepts",
    ],
    cover: { alt: "Albastini tournament campaign design by Dustan Kibaja", ratio: "4/5" },
    gallery: [
      { alt: "Albastini tournament campaign key visual", span: "full", ratio: "16/9" },
      { alt: "Albastini event poster", span: "half", ratio: "4/5" },
      { alt: "Albastini promotional poster", span: "half", ratio: "4/5" },
      { alt: "Albastini social media graphic", span: "third", ratio: "1/1" },
      { alt: "Albastini fixture announcement graphic", span: "third", ratio: "1/1" },
      { alt: "Albastini digital marketing visual", span: "third", ratio: "1/1" },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "kb-softwares",
    index: "03",
    title: "KB Softwares",
    company: "KB Softwares",
    industry: "Technology",
    categories: ["Technology", "Digital Marketing", "Social Media"],
    duration: "6+ Months",
    role: "Responsible for the company's graphic design and visual communication requirements, including social media, campaigns, promotional materials, and digital marketing content.",
    description:
      "Graphic design and visual communication for a technology-focused company, including social content, promotional materials, campaigns, and digital marketing assets.",
    overview:
      "KB Softwares needed technical services communicated in a way non-technical audiences could immediately understand, across an ongoing stream of social and marketing material.",
    approach:
      "I simplified dense service messaging into short visual statements, paired with a restrained technology-forward palette and layout grid that kept the output consistent across weeks of publishing.",
    responsibilities: [
      "Social media graphics",
      "Promotional materials",
      "Campaign design",
      "Digital marketing assets",
      "Visual communication",
    ],
    cover: { alt: "KB Softwares digital marketing design by Dustan Kibaja", ratio: "4/5" },
    gallery: [
      { alt: "KB Softwares campaign key visual", span: "full", ratio: "16/9" },
      { alt: "KB Softwares social media graphic", span: "half", ratio: "1/1" },
      { alt: "KB Softwares service promotional graphic", span: "half", ratio: "1/1" },
      { alt: "KB Softwares digital marketing asset", span: "half", ratio: "4/5" },
      { alt: "KB Softwares promotional material", span: "half", ratio: "4/5" },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "gemineye",
    index: "04",
    title: "Gemineye",
    company: "Gemineye",
    industry: "Brand & Marketing",
    categories: ["Branding", "Marketing", "Social Media"],
    duration: "6+ Months",
    role: "Managed graphic design and visual communication requirements including social media graphics, campaign materials, promotional posters, event visuals, and marketing assets.",
    description:
      "Visual communication and promotional design supporting brand visibility, digital marketing, and audience engagement.",
    overview:
      "Gemineye needed a stronger, more consistent visual presence to support brand visibility and ongoing marketing activity.",
    approach:
      "I focused on consistency first — a defined type scale, colour usage and composition rules — then produced campaign and social material within that system so the brand became recognisable at a glance.",
    responsibilities: [
      "Social media graphics",
      "Campaign materials",
      "Promotional posters",
      "Event visuals",
      "Marketing assets",
      "Brand visuals",
    ],
    cover: { alt: "Gemineye brand and marketing design by Dustan Kibaja", ratio: "4/5" },
    gallery: [
      { alt: "Gemineye brand visual", span: "full", ratio: "16/9" },
      { alt: "Gemineye promotional poster", span: "half", ratio: "4/5" },
      { alt: "Gemineye campaign material", span: "half", ratio: "4/5" },
      { alt: "Gemineye social media graphic", span: "third", ratio: "1/1" },
      { alt: "Gemineye event visual", span: "third", ratio: "1/1" },
      { alt: "Gemineye marketing asset", span: "third", ratio: "1/1" },
    ],
    featured: true,
    order: 4,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const getProject = (slug: string) => sortedProjects.find((p) => p.slug === slug);

export const getProjectNeighbours = (slug: string) => {
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? sortedProjects[i - 1] : sortedProjects[sortedProjects.length - 1],
    next: i < sortedProjects.length - 1 ? sortedProjects[i + 1] : sortedProjects[0],
  };
};
