import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./Codeblock";
import remarkGfm from "remark-gfm";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="markdown">
      <ReactMarkdown
        components={{ code: CodeBlock }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;
