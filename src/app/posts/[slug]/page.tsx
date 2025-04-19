import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Date from "@/components/Date";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
