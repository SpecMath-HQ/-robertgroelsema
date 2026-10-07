import { renderMonogram } from "./monogram";

// iPhone and iPad home-screen icon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return renderMonogram(size.width);
}
