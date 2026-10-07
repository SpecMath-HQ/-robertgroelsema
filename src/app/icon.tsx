import { renderMonogram } from "./monogram";

// Browser tab, bookmark and Android icon. One large image that browsers
// scale down for tabs. Like the Apple icon, it is drawn once at build time
// (no per-request rendering on the server).
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return renderMonogram(size.width);
}
