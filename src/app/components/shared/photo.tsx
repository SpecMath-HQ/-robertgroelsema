import Image from "next/image";

type PhotoProps = {
  src?: string;
  alt: string;
  ratio: "landscape" | "portrait" | "square" | "natural";
  sizes: string;
  // Required for the "natural" ratio: the image's own pixel size.
  width?: number;
  height?: number;
  // Optional for the "natural" ratio: show the image cropped to this
  // aspect ratio (for example "3 / 2"), centered on `focus` (a CSS
  // object-position such as "50% 70%"). The file itself is not changed.
  crop?: string;
  focus?: string;
  caption?: string;
  priority?: boolean;
};

const dimensions = {
  landscape: { width: 2400, height: 1600, aspect: "aspect-[3/2]" },
  portrait: { width: 1920, height: 2400, aspect: "aspect-[4/5]" },
  square: { width: 1600, height: 1600, aspect: "aspect-square" },
};

// A plain rectangle, cropped to a fixed ratio or shown at the image's own
// ("natural") proportions. Until an image is supplied, it renders a
// field-colored placeholder (square for the natural ratio).
const Photo = ({ src, alt, ratio, sizes, width, height, crop, focus, caption, priority }: PhotoProps) => {
  const fixed = ratio === "natural" ? null : dimensions[ratio];

  return (
    <figure className="m-0">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={fixed?.width ?? width ?? 1600}
          height={fixed?.height ?? height ?? 1600}
          sizes={sizes}
          priority={priority}
          className={fixed ? `${fixed.aspect} w-full object-cover` : crop ? "w-full object-cover" : "h-auto w-full"}
          style={!fixed && crop ? { aspectRatio: crop, objectPosition: focus ?? "50% 50%" } : undefined}
        />
      ) : (
        <div aria-hidden="true" className={`${fixed?.aspect ?? "aspect-square"} w-full bg-field`} />
      )}
      {caption && (
        <figcaption className="mt-2 text-small text-muted">{caption}</figcaption>
      )}
    </figure>
  );
};

export default Photo;
