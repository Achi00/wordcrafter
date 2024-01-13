"use state";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AArrowUp, ExternalLink, Sparkle } from "lucide-react";
import { useAIResponse } from "@/context/AIResponseContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const AIExpandContent = ({ editor }: any) => {
  const [isContentAvailable, setIsContentAvailable] = useState(false);

  const { setExpandedContent, expandedContent } = useAIResponse();

  // check for content in editor
  const getContentFromEditor = useCallback(() => {
    const blocks = editor.topLevelBlocks as any;
    let content = "";

    blocks.forEach((block: any) => {
      if (block.content && block.content.length > 0 && block.content[0].text) {
        content += block.content[0].text + "\n";
      }
    });

    return content;
  }, [editor]);

  useEffect(() => {
    const interval = setInterval(() => {
      const content = getContentFromEditor();
      setIsContentAvailable(content.trim() !== "");
    }, 50); // Check every 500ms or choose a suitable interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, [getContentFromEditor]);

  const handleSubmitToServer = async () => {
    const content = getContentFromEditor();
    try {
      const response = await fetch("http://localhost:8080/expandwithai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }), // Send the editor content
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break; // Stream completed
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n");

        for (let i = 0; i < chunks.length - 1; i++) {
          try {
            const parsedChunk = JSON.parse(chunks[i]);
            if (parsedChunk.type === "expand") {
              // Append new chunk to cumulative content
              setExpandedContent(
                (prevExtend: string) => prevExtend + parsedChunk.content
              );
            }
          } catch (e) {
            console.error("Error parsing chunk: ", e);
          }
        }

        buffer = chunks[chunks.length - 1];
      }
    } catch (error) {
      console.error("Error sending content to server:", error);
    }
  };

  return (
    <div className="relative">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span tabIndex={0}>
            <Button
              onClick={handleSubmitToServer}
              disabled={!isContentAvailable}
              variant="outline"
              className="flex items-center gap-2"
            >
              <div className="flex items-center">
                <Sparkle size={12} className="self-start" />
                <AArrowUp />
                <Sparkle size={12} className="self-end" />
              </div>{" "}
              Expand writing
            </Button>
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 mt-3">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Expand Content with AI</h4>
            <p className="text-sm text-gray-600">
              Quickly enhance your text with insights and analysis generated by
              AI.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">Write</span> your text and hit the{" "}
                <span className="font-medium">
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 text-sm"
                  >
                    <div className="flex items-center">
                      <Sparkle size={10} className="self-start" />
                      <AArrowUp size={18} />
                      <Sparkle size={10} className="self-end" />
                    </div>{" "}
                    Expand writing
                  </Button>
                </span>{" "}
                button.
              </li>
              <li>
                <span className="font-medium">Review</span> the AI{"'"}s
                suggestions and integrate as needed.
              </li>
              <li>
                <span className="font-medium">Provide specific content</span>{" "}
                for more focused expansions.
              </li>
            </ul>
            <a
              href="#"
              className="text-indigo-600 hover:underline flex items-center"
            >
              <ExternalLink size={16} className="mr-1" /> More details
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
      {expandedContent && <p>{expandedContent?.content}</p>}
    </div>
  );
};

export default AIExpandContent;
