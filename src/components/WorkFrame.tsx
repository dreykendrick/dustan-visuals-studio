import { cn } from "@/lib/utils";
import type { WorkImage } from "@/data/projects";

type WorkFrameProps = {
  image: WorkImage;
  className?: string;
  priority?: boolean;
  label?: string;
  onClick?: () => void;
};

/**
 * Renders a real design file when `image.src` is set, otherwise a clearly
 * labelled placeholder frame ready for Dustan's artwork.
 */
export function WorkFrame({ image, className, priority, label, onClick }: WorkFrameProps) {
  const ratio = image.ratio ?? "4/5";
  const interactive = Boolean(onClick && image.src);

  const content = image.src ? (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes="(max-width: 768px) 100vw, 50vw"
      className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
    />
  ) : (
    <div
      className="placeholder-hatch flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center"
      role="img"
      aria-label={`Placeholder for ${image.alt}`}
    >
      <span className="eyebrow">{label ?? "Artwork placeholder"}</span>
      <span className="max-w-[26ch] font-display text-sm leading-snug text-muted-foreground">
        {image.alt}
      </span>
    </div>
  );

  const Wrapper = interactive ? "button" : "div";

  return (
    <figure className={cn("group m-0", className)}>
      <Wrapper
        type={interactive ? "button" : undefined}
        onClick={interactive ? onClick : undefined}
        aria-label={interactive ? `Open image: ${image.alt}` : undefined}
        className={cn(
          "block w-full overflow-hidden bg-secondary",
          interactive && "cursor-zoom-in",
        )}
        style={image.src ? undefined : { aspectRatio: ratio }}
      >
        {content}
      </Wrapper>
      {image.caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
