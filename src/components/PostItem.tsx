"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "../lib/posts";
import Date from "./Date";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <article className="flex flex-wrap gap-6 mb-6 p-5 border-2 border-foreground md:w-auto w-80">
      {post.imagePath && (
      <div className="flex-1 min-w-64">
        <Image src={post.imagePath} alt={""} width="275" height="200" />
      </div>)}
      <div className="flex-1 min-w-64">
        <h3 className="text-2xl font-bold mb-2 mt-0 !pt-0 font-condensed-medium">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 hover:underline"
          >
            {post.title}
          </Link>
        </h3>
        <Date date={post.date} />
        <p className="text-base !text-foreground-mid mb-4 line-clamp-3">
          {post.preview}
        </p>
        <Link
          href={`/posts/${post.slug}`}
          className="inline-block border-2 border-foreground hover:bg-blue-600 py-2 px-4 transition-colors"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
