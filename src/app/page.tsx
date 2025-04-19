import PostList from "../components/PostList";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h1>Welcome to Maxitect&apos;s blog</h1>
      <p>
        Hi! I&apos;m Max, an architect/computational designer turned software
        developer/data scientist. This is where I dump my thoughts on various
        topics. Have a look around and do not hesitate to get in touch with me
        to discuss anything that is of interest!
      </p>
      <h2>Blog posts</h2>
      <PostList posts={posts} />
    </>
  );
}
