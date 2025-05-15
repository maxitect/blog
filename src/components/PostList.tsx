"use client";

import React, { useState, useMemo } from "react";
import PostItem from "./PostItem";
import TagFilter from "./TagFilter";
import { Post } from "../lib/posts";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts;
    }
    return posts.filter(
      (post) =>
        post.tags &&
        selectedTags.some((tag) => post.tags && post.tags.includes(tag))
    );
  }, [posts, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  return (
    <div>
      {allTags.length > 0 && (
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAll}
        />
      )}
      <div className="space-y-10">
        {filteredPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && selectedTags.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No posts found matching the selected tags.
        </div>
      )}
    </div>
  );
}
