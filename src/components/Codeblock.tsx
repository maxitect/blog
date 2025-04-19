import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { HTMLAttributes } from "react";
import type { Element } from "hast";

interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  /** Raw AST node, passed by react-markdown when passNode is enabled */
  node?: Element;
  /** Whether this is an inline code snippet */
  inline?: boolean;
  /** Language class, e.g., 'language-js' */
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline && match) {
    // Render block code with syntax highlighting
    return (
      <SyntaxHighlighter
        PreTag="pre"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        style={codeStyle}
        language={match[1]}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }
  // Render inline code or missing language
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
