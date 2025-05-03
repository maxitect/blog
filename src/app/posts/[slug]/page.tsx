import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Date from "@/components/Date";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Maxitect Blog",
    };
  }

  return {
    title: `${post.title} | Maxitect Blog`,
  };
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
      <div className="flex flex-wrap gap-8 mb-10">
        <div className="flex-1 min-w-64">
          <h1>{post.title}</h1>
          <hr />
          <div className="flex flex-wrap justify-between items-center">
            <Date date={post.date} />
            {post.github && (
              <Link
                href={post.github}
                target="_blank"
                className="inline-block border-2 border-foreground hover:bg-blue-600 py-2 px-4 transition-colors"
              >
                Explore the repo
              </Link>
            )}
          </div>
        </div>
        {post.imagePath && (
          <div className="md:ml-auto min-w-64">
            <Image src={post.imagePath} alt={""} width="300" height="300" />
          </div>
        )}
      </div>

      <PostContent content={post.content} />
    </article>
  );
}
