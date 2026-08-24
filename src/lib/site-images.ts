import { sortedProjects, type Project, type WorkImage } from "@/data/projects";

export type SiteImageMap = Record<string, string>;

export const coverSlot = (slug: string) => `${slug}:cover`;
export const gallerySlot = (slug: string, index: number) => `${slug}:gallery:${index}`;

/** Every editable image slot on the site, grouped per project. */
export const imageSlots = sortedProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  cover: { key: coverSlot(project.slug), image: project.cover },
  gallery: project.gallery.map((image, i) => ({
    key: gallerySlot(project.slug, i),
    image,
  })),
}));

const withSrc = (image: WorkImage, url?: string): WorkImage =>
  url ? { ...image, src: url } : image;

/** Merge admin-managed image URLs into the static project data. */
export function applyImages(project: Project, map: SiteImageMap): Project {
  return {
    ...project,
    cover: withSrc(project.cover, map[coverSlot(project.slug)]),
    gallery: project.gallery.map((image, i) =>
      withSrc(image, map[gallerySlot(project.slug, i)]),
    ),
  };
}

export function applyImagesToAll(map: SiteImageMap): Project[] {
  return sortedProjects.map((p) => applyImages(p, map));
}

/** Public URL for a file stored in the site-images bucket. */
export const storageImageUrl = (path: string) =>
  `/api/public/site-image/${path.split("/").map(encodeURIComponent).join("/")}`;
