import React from 'react';

interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <article className="mb-6">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-600">{post.date}</p>
    </article>
  );
};

export default PostItem;
