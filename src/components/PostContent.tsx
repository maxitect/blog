import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./Codeblock";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>
      {content}
    </ReactMarkdown>
  );
};

export default PostContent;
