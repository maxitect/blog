import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
        ],
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://maxitect.blog/sitemap.xml",
    host: "https://maxitect.blog",
  };
}
