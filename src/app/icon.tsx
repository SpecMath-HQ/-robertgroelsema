import { renderMonogram } from "./monogram";

// Browser tab icons: a small one for tabs and bookmarks, a large one for
// Android home screens and search results.
const sizes = { small: 32, large: 512 } as const;

// Render the icons once at build time rather than on every request.
export const dynamic = "force-static";

export function generateImageMetadata() {
  return (Object.keys(sizes) as (keyof typeof sizes)[]).map((id) => ({
    id,
    size: { width: sizes[id], height: sizes[id] },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: keyof typeof sizes }) {
  return renderMonogram(sizes[id]);
}
