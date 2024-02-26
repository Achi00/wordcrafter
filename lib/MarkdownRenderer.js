import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Import the style you prefer from react-syntax-highlighter
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";
import { Files } from "lucide-react";

const MarkdownRenderer = ({ content }) => {
  // Define a custom style for inline code
  const inlineCodeStyle = {
    backgroundColor: "#191C1F", // Dark background for inline code, adjusted for readability
    color: "#c5c8c6", // Light text color for readability, you can adjust this as needed
    padding: "0.2em 0.4em", // Add some padding around the inline code
    margin: "0.5em 0.5em",
    fontWeight: "bold",
    borderRadius: "8px", // Slightly rounded corners for aesthetics
    fontFamily: "Monaco, monospace", // Monospace font for code
    display: "inline-block",
    lineHeight: "35px",
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        strong: ({ node, ...props }) => (
          <div
            style={{
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              // margin: "2.5rem",
              display: "inline-block",
            }}
            // className="py-10 inline-block"
          >
            <strong {...props} className="text-xl font-bold" />
          </div>
        ),
        // Custom rendering for code blocks
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="relative flex my-2">
              <div className="absolute right-0 top-0 rounded-md flex items-center justify-center border border-white cursor-pointer hover">
                {/* <FaCopy className="text-white text-3xl p-1 " /> */}
                <Files
                  size={30}
                  className="text-white p-1 hover:text-red-500"
                />
              </div>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            // Styling for inline code
            <code style={inlineCodeStyle} {...props}>
              <div className="flex w-full items-center gap-3 justify-between">
                {children}
                {/* <div className="rounded-md w-7 flex items-start justify-center border border-white  hover:bg-slate-500 cursor-pointer ">
                  <FaCopy className="text-white text-xl p-1 " />
                </div> */}
              </div>
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
