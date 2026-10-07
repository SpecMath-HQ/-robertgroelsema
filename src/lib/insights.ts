import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Posts are Markdown files in content/insights. Files whose names start
// with "_" are templates and never published. Posts marked `draft: true`
// show only on the local development server.
const postsDirectory = path.join(process.cwd(), "content", "insights");
const showDrafts = process.env.NODE_ENV !== "production";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  topic: string;
  image: string;
  html: string;
};

const readPost = (fileName: string): (Post & { draft: boolean }) => {
  const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const { data, content } = matter(source);

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: String(data.title ?? ""),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    topic: String(data.topic ?? ""),
    image: String(data.image ?? ""),
    draft: data.draft === true,
    html: marked.parse(content, { async: false }),
  };
};

export const getPosts = (): Post[] => {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map(readPost)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
};

export const getPost = (slug: string): Post | undefined =>
  getPosts().find((post) => post.slug === slug);

export const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
