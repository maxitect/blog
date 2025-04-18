import PostList from "../components/PostList";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 font-condensed-medium">Posts</h1>
      <PostList posts={posts} />
    </>
  );
}
