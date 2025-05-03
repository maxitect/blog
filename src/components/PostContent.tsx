import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./Codeblock";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="markdown">
      <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
