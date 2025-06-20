import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const baseUrl = "https://maxitect.blog";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  posts.forEach((post) => {
    const postDate = new Date(post.date);

    routes.push({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    routes.push({
      url: `${baseUrl}/posts/${post.slug}.md`,
      lastModified: postDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return routes;
}
