import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The site's "RG" monogram: white Barlow Condensed ExtraBold on the ocean
// blue, in a square to match the site's square geometry. Used for the
// browser tab icon and the iPhone home-screen icon.
export const renderMonogram = async (size: number) => {
  const font = await readFile(join(process.cwd(), "src/app/fonts/BarlowCondensed-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2A50D0",
          color: "#FFFFFF",
          fontFamily: "Barlow Condensed",
          fontWeight: 800,
          fontSize: size * 0.78,
          lineHeight: 1,
          letterSpacing: size * -0.01,
          // Optical correction: cap-height letters sit slightly low in the
          // line box, so nudge them up to look centered.
          paddingBottom: size * 0.075,
        }}
      >
        RG
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Barlow Condensed", data: font, weight: 800, style: "normal" }],
    }
  );
};
