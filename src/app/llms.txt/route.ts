import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = "https://maxitect.blog";

  const content = `# Maxitect Blog

This site contains technical writing about software engineering, AI, machine learning, and computational design by Maxime Downe, a London-based architect and software engineer.

## Blog Posts

${posts
  .map(
    (post) =>
      `- [${post.title}](${baseUrl}/posts/${post.slug}.md) - ${post.preview}`
  )
  .join("\n")}

## Raw Markdown Access

All blog posts are available as raw markdown:
${posts.map((post) => `${baseUrl}/posts/${post.slug}.md`).join("\n")}

## About

Maxime Downe is co-founder of Tandem Creative Dev and a Founders & Coders alumnus. He writes about the intersection of traditional architecture and software development, AI-assisted development workflows, and practical machine learning applications.

## Contact

- Email: maxime.downe@gmail.com
- LinkedIn: https://linkedin.com/in/maxime-downe-642ba74b
- GitHub: https://github.com/maxitect
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
