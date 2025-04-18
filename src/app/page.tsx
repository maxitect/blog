import Layout from '../../components/Layout';
import PostList from '../../components/PostList';
import { getAllPosts } from '../../lib/posts';

export default function Home() {
  const posts = getAllPosts();
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Maxitect Blog</h1>
      <PostList posts={posts} />
    </Layout>
  );
}
