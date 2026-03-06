import PostList from "../components/PostList";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h1>Welcome to Maxitect Blog</h1>
      <p className="markdown">
        Hi, I&apos;m{" "}
        <a
          href="https://linkedin.com/in/maxime-downe-642ba74b"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Maxime Downe's LinkedIn profile"
        >
          Maxime Downe
        </a>{" "}
        (aka{" "}
        <a
          href="https://github.com/maxitect"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit maxitect's github profile"
        >
          maxitect on GitHub
        </a>
        ) — a London-based software engineer and AI systems builder who started
        out as an architect and ended up building rather different kinds of
        structures.
      </p>
      <p className="markdown">
        I&apos;m co-founder of{" "}
        <a
          href="https://runintandem.com"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Tandem Creative Dev website"
        >
          Tandem Creative Dev
        </a>
        , where we build web applications, AI pipelines, and data platforms for
        public sector bodies, charities, and founders working on problems worth
        solving — recent work spans a national skills classification API for the
        Department for Education, an AI research platform for Gatsby Foundation,
        and NLP infrastructure for maritime safety data.
      </p>
      <p>
        On this blog I write about what I&apos;m actually building: multi-agent
        systems, RAG pipelines, full-stack architecture decisions, and the
        practical realities of shipping AI products that work in production.
        Less theory, more what I learned when it broke.
      </p>
      <p>Drop me a line if something resonates.</p>
      <h2>Blog posts</h2>
      <PostList posts={posts} />
    </>
  );
}
