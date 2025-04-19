import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Date from "@/components/Date";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto">
      <h1>{post.title}</h1>
      <Date date={post.date} />
      <PostContent content={post.content} />
    </article>
  );
}
