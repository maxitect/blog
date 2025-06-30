---
title: "From Static Files to Dynamic LLM Optimisation: Building llms.txt for the AI-first web"
date: "2025-06-30"
github: "https://github.com/maxitect/blog"
tags: ["ai", "seo", "best practices"]
---

The web's discovery landscape is shifting. Where Google once reigned supreme, LLMs now increasingly serve as the primary interface between users and web content. This fundamental change demands new approaches to content discoverability. Enter llms.txt - a simple text file that could determine whether AI systems understand and reference your content correctly.

## The evolution from robots to LLMs

For decades, `robots.txt` and `sitemap.xml` governed how search engines crawled and indexed websites. These files provided essential metadata: what to crawl, what to ignore, and how often to check for updates. They worked because search engines operated predictably - crawling HTML, extracting text, and building indices.

LLMs operate differently. They consume vast amounts of text during training and increasingly access web content in real-time through retrieval systems. The challenge is that modern web pages are cluttered with navigation, styling, advertisements, and JavaScript-rendered content that obscures the actual information. An LLM parsing your React-heavy website might extract more boilerplate than meaningful content.

This is where [llms.txt](https://llmstxt.org/) comes in. As the specification states:

> "The llms.txt file is a simple text file that provides a brief, plain-text overview of the most important information about a website or project... making it easier for LLMs to quickly understand and summarize the key details."

## Starting simple: Static implementation

My journey began with [Tandem Creative Dev's website](https://runintandem.com/llms.txt), where I implemented the most straightforward approach: static files in the public folder.

```
public/
├── llms.txt
├── index.md
└── privacy-policy.md
```

The llms.txt provides a concise overview:

```text
# Tandem Creative Dev

> London-based creative development agency specialising in human-centred design for arts, music, and community-focused projects...

## Portfolio

- [Things We Do](https://things-we-do.netlify.app/): Mobile therapy app for behaviour control conditions using TypeScript, Next.js, Tailwind, RxDB, Plotly.js
- [Itch Film](https://itchfilm.com/): London film studio website for reputable studio famous for "For No Good Reason" starring Johnny Depp
...
```

Alongside this, I created markdown versions of each page. Markdown is a perfect middle ground - human-readable, machine-parseable, and free from HTML clutter. An LLM can extract information from markdown without parsing `<div>` soup or executing JavaScript.

This approach works well for static content but requires manual updates. Every portfolio addition, service change, or testimonial update means editing multiple files. For a small agency site, this is manageable. For content-heavy sites, it quickly becomes a maintenance burden.

## Scaling with automation: Dynamic blog generation

My [personal blog](https://maxitect.blog/llms.txt) presented a different challenge (yes, this blog you are reading now!). With posts published regularly, manually maintaining `llms.txt` would be unsustainable. The solution is programmatic generation.

First, I moved all blog posts to the public folder, making them directly accessible as markdown, and updated my page generation script to read from public too:

```typescript
const postsDirectory = path.join(process.cwd(), "public", "posts");
```

Then I created a dynamic route that generates `llms.txt` on demand:

```typescript
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
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
```

This approach automatically includes new posts, maintains consistent formatting, and provides both human-friendly descriptions and direct markdown links. The preview generation extracts the first 200 characters of actual content, stripping markdown formatting:

```typescript
const preview = (() => {
  const text = content
    .replace(/^#+.*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim()
    .slice(0, 200);

  const lastSpace = text.lastIndexOf(" ");
  return lastSpace > 0 ? text.slice(0, lastSpace) + "…" : text;
})();
```

The `sitemap.xml` generation follows similar patterns, ensuring search engines and LLMs can discover both HTML and markdown versions:

```typescript
posts.forEach((post) => {
  routes.push({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: postDate,
    changeFrequency: "yearly",
    priority: 0.8,
  });

  routes.push({
    url: `${baseUrl}/posts/${post.slug}.md`,
    lastModified: postDate,
    changeFrequency: "yearly",
    priority: 0.6,
  });
});
```

## Peak dynamism: Real-time content generation

The [Clark's Bowling Club website](https://clarksbowlingclub.com/llms.txt) pushed this concept further. The band updates their tour dates, releases, and lyrics through Google Sheets - no code deployment needed. This meant both the website and its LLM-friendly versions needed real-time generation.

The implementation generates markdown pages on demand from Google Sheets data:

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");

  if (!slug.endsWith(".md")) {
    return new Response("Not found", { status: 404 });
  }

  const page = slug.replace(".md", "");
  const content = await generatePageMarkdown(page);

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
```

For [tour dates](https://clarksbowlingclub.com/tour.md), the system fetches from Google Sheets and formats for optimal LLM consumption:

```typescript
const tourData = await fetchSheet(572869052);
const tourItems = parseCsv<TourDateType>(tourData, (row) => !!row.eventDate);

const futureGigs = tourItems.filter((gig) => {
  const [day, month, year] = gig.eventDate.split("/").map(Number);
  const gigDate = new Date(year, month - 1, day);
  return gigDate >= now;
});

sections.push("## Upcoming Events");
futureGigs.forEach((gig) => {
  sections.push(`**${date}** - ${gig.venue}, ${gig.location}`);
  if (gig.ticketUrl) {
    sections.push(`[Buy Tickets](${gig.ticketUrl})`);
  }
});
```

The `llms.txt` generation similarly pulls live data:

```typescript
async function generateLLMsTxt(): Promise<string> {
  const sections: string[] = [];

  // Dynamic music catalogue
  const musicData = await fetchSheet(1713768433);
  const musicItems = parseCsv<IFrameProps>(musicData);

  for (const category of categories) {
    sections.push(`### ${category}`);
    categoryItems.forEach((item) => {
      sections.push(`- ${item.title}`);
    });
  }

  // Real-time tour dates
  const tourData = await fetchSheet(572869052);
  // ... format upcoming shows

  return sections.join("\n");
}
```

## Why this matters for modern SEO

Traditional SEO optimised for crawlers that parsed HTML. LLM-era SEO optimises for systems that understand context and meaning. Consider how an LLM might process these different formats:

**Modern React page**: Hundreds of lines of JSX, utility classes, event handlers, accessibility features and component logic to extract one paragraph of actual content.

**Markdown file**: Pure content, clearly structured, immediately parseable.

The `robots.txt` configuration reflects this shift:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "anthropic-ai", "Claude-Web", "CCBot"],
        allow: "/",
        crawlDelay: 2,
      },
      // ... traditional crawlers
    ],
  };
}
```

Notice the specific handling for AI crawlers with appropriate delays. This acknowledges their importance whilst respecting rate limits.

## Implementation lessons

Building these systems revealed several key principles:

**1. Markdown as the universal format**: Whether static or dynamic, markdown provides the optimal balance of structure and simplicity for LLM consumption.

**2. Direct file access matters**: Making content available at predictable URLs (like `/posts/my-post.md`) reduces parsing overhead.

**3. Dynamic generation enables maintenance**: For frequently updated content, generating `llms.txt` and markdown on demand ensures accuracy without manual intervention.

**4. Caching strategies**: The Clark's Bowling Club implementation includes cache headers (`max-age=3600`) to balance freshness with server load.

**5. Graceful degradation**: Each implementation handles errors gracefully, returning sensible defaults when data sources fail.

## Looking forward

As LLMs begin to replace traditional search engines, websites need dual optimisation strategies: rich, interactive and accessible experiences for humans and clean, structured content for AI systems. The approaches I've outlined - from static files to dynamic generation - provide a foundation for this new paradigm.

The question isn't whether to implement `llms.txt`, but how sophisticated your implementation should be. Static sites might suffice with manual files. Content-heavy sites benefit from automation. Real-time data sources demand fully programmatic generation.

Just as `robots.txt` and `sitemap.xml` became non-negotiable elements of technical SEO audits, `llms.txt` and markdown page variants are rapidly becoming essential checkpoints for AI-readiness. Forward-thinking SEO tools are already beginning to incorporate LLM optimisation scores, measuring not just crawlability but comprehensibility. Within the next year, we'll likely see "LLM Coverage" metrics sitting alongside Core Web Vitals in site audit reports. The sites that adapt now - providing clean, structured, machine-readable versions of their content - will have a decisive advantage as AI-powered search becomes the default way users discover and consume web content. The infrastructure is already here; the only question is how quickly the industry standardises these practices.
