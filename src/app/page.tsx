import Link from "next/link";
import PostList from "../components/PostList";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h1>Welcome to Maxitect Blog</h1>
      <p className="markdown">
        Hello! I&apos;m{" "}
        <Link
          href="https://linkedin.com/in/maxime-downe-642ba74b"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Maxime Downe's LinkedIn profile"
        >
          Maxime Downe
        </Link>{" "}
        (aka{" "}
        <Link
          href="https://github.com/maxitect"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit maxitect's github profile"
        >
          maxitect on github
        </Link>
        ), a London-based architect and software engineer who swapped designing
        buildings for building software. After spearheading rapid-engineering
        BIM pipelines and crafting bespoke 3D modelling tools, I&apos;ve pivoted
        to building web and AI-powered applications that solve real-world
        problems.
      </p>
      <p className="markdown">
        Currently on the Founders programme at{" "}
        <Link
          href="https://foundersandcoders.com"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Founders and Coders website"
        >
          Founders & Coders
        </Link>{" "}
        and co-founder of{" "}
        <Link
          href="https://runintandem.com"
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Tandem Creative Dev website"
        >
          Tandem Creative Dev
        </Link>
        , I&apos;m fascinated by the intersection of computational design and
        modern web development. Whether I&apos;m debugging collapsed neural
        networks, experimenting with AI-assisted coding workflows, or building
        RAG chatbots, there&apos;s always something interesting to unpack.
      </p>
      <p>
        On this blog, you&apos;ll find my thoughts on everything from the lean
        coding style of data scientists to practical frameworks for working with
        AI. I write about the projects that challenge me, the bugs that I
        grapple with, and the occasional breakthrough that makes it worthwhile.
      </p>
      <p>
        Drop me a line if something resonates — I&apos;m always up for a chat
        about code, architecture, or how to make machines do clever things.
      </p>
      <h2>Blog posts</h2>
      <PostList posts={posts} />
    </>
  );
}
