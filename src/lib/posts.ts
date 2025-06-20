import fs, { existsSync } from "fs";
import path, { join } from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "public", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  preview: string;
  imagePath?: string;
  github?: string;
  tags?: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/-+/g, "-");
}

export function getAllPosts(): Post[] {
  if (!existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const imagePath = "/" + fileName.replace(".md", ".png");
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const title =
        data.title || slug.split("_")[1]?.replace(/-/g, " ") || slug;
      const date =
        data.date ||
        slug.split("_")[0]?.replace(/-/g, "/") ||
        new Date().toISOString().split("T")[0];

      const preview = (() => {
        const lines = content.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed.startsWith("#")) continue;
          if (trimmed.length <= 200) return trimmed;
          const sliced = trimmed.slice(0, 200);
          return sliced.slice(0, sliced.lastIndexOf(" ")) + "…";
        }
        return "";
      })();

      const slugified = slugify(title);
      const publicImagePath = join(process.cwd(), "public", imagePath);
      const imageExists = imagePath && existsSync(publicImagePath);

      return {
        slug: slugified,
        title,
        date,
        content,
        preview,
        ...(imageExists ? { imagePath } : {}),
        github: data.github,
        tags: data.tags,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
