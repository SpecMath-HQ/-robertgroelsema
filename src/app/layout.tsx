import type { Metadata } from "next";
import { Barlow_Condensed, Public_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import pageData from "@/data/page-data.json";
import { SITE_URL } from "@/data/site";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const { profile } = pageData;
const title = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: profile.statement,
  openGraph: {
    title,
    description: profile.statement,
    type: "profile",
    locale: "en_US",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${publicSans.variable} ${sourceSerif.variable}`}>
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
