import React from 'react';
import PostItem from './PostItem';

interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
