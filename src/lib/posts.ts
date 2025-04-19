import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export interface Post {
  /**
   * URL friendly slug generated from the post title. Used as the route
   * segment under `/posts/[slug]`.
   */
  slug: string;
  /** Human readable title extracted from front‑matter or derived from file name */
  title: string;
  /** ISO date string extracted from front‑matter or derived from file name */
  date: string;
  /** Full markdown content (without the front‑matter) */
  content: string;
  /** Short preview/excerpt that is rendered on the index page */
  preview: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, "-")
    // Remove all characters that are not alphanumeric, hyphen or underscore
    .replace(/[^a-z0-9-_]/g, "")
    // Collapse multiple hyphens
    .replace(/-+/g, "-");
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const title = data.title || slug.split("_")[1].replace(/-/g, " ");
    const date = data.date || slug.split("_")[0].replace(/-/g, "/");

    // Generate a short preview (first non‑heading paragraph or max 200 chars)
    const preview = (() => {
      // Remove heading lines (starting with #)
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue; // skip empty lines
        if (trimmed.startsWith("#")) continue; // skip headings
        // Return first 200 characters (avoid cutting words in half where possible)
        if (trimmed.length <= 200) return trimmed;
        const sliced = trimmed.slice(0, 200);
        return sliced.slice(0, sliced.lastIndexOf(" ")) + "…";
      }
      return "";
    })();

    const slugified = slugify(title);

    return { slug: slugified, title, date, content, preview };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
