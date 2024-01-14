"use clinet";
import { useCallback, useState } from "react";
import {
  AArrowUp,
  AlertTriangle,
  ExternalLink,
  Loader2,
  PencilRuler,
  Sparkle,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAIResponse } from "@/context/AIResponseContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import SummarizerDrawer from "../UiComponents/SummarizerDrawer";

const AISummarizeContent = ({ editor }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    isContentAvailable,
    contentSummarize,
    contentSummarizeList,
    setSummarizedContent,
    setSummarizedContentList,
  } = useAIResponse();

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

  const handleSubmitToServer = async () => {
    const content = getContentFromEditor();
    try {
      setIsLoading(true);
      setIsDrawerOpen(true);
      const response = await fetch("http://localhost:8080/summarizewithai", {
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
            if (parsedChunk.type === "summary") {
              // Append new chunk to cumulative content
              setSummarizedContent((prevExtend: string) => {
                const updatedContent = prevExtend + parsedChunk.content;
                console.log("Updated summary content:", updatedContent);
                return updatedContent;
              });
            }
            if (parsedChunk.type === "summaryList") {
              setSummarizedContentList((prevContent: string) => {
                const updatedListContent = prevContent + parsedChunk.content;
                console.log(
                  "Updated summary list content:",
                  updatedListContent
                );
                return updatedListContent;
              });
            }
          } catch (e) {
            console.error("Error parsing chunk: ", e);
          }
        }

        buffer = chunks[chunks.length - 1];
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending content to server:", error);
    }
  };
  return (
    <div className="relative flex">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span tabIndex={0}>
            <Button
              onClick={handleSubmitToServer}
              disabled={!isContentAvailable || isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <Sparkle size={12} className="self-start" />
                    <PencilRuler />
                    <Sparkle size={12} className="self-end" />
                  </div>{" "}
                  Summerize Content
                </>
              )}
            </Button>
          </span>
        </HoverCardTrigger>
        {!isContentAvailable ? (
          <HoverCardContent className="w-80 mt-3">
            {isLoading ? (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-700">
                  Processing Your Request
                </h4>
                <p className="text-sm text-gray-600">
                  AI is currently summarizing your content. This may take a
                  moment. Please be patient as the AI generates insights and
                  expands upon your text.
                </p>
                <div className="flex items-center justify-center mt-4">
                  <Button variant="outline">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content
                  </Button>
                </div>
                <p className="text-sm text-gray-500 italic mt-2">
                  Tip: Review the AI suggestions carefully and integrate them as
                  needed.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">
                  Summarize Content with AI
                </h4>
                <p className="text-sm text-gray-600">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>At The moment button is disabled,</AlertTitle>
                    <AlertDescription className="mt-2">
                      To enable the{" "}
                      <span className="font-bold">{`"Expand Writing"`}</span>{" "}
                      feature, please start by adding your initial thoughts or
                      draft into the editor. This helps the AI understand the
                      context and provide more relevant expansions.
                    </AlertDescription>
                  </Alert>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Write</span> your text and hit
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
                        Summarize Content
                      </Button>
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">Review</span> the AI{"'"}s
                    suggestions and integrate as needed.
                  </li>
                  <li>
                    <span className="font-medium">
                      Provide specific content
                    </span>{" "}
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
            )}
          </HoverCardContent>
        ) : (
          <>
            <HoverCardContent className="w-80 mt-3">
              {isLoading ? (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Processing Your Request
                  </h4>
                  <p className="text-sm text-gray-600">
                    AI is currently enhancing your content. This may take a
                    moment. Please be patient as the AI generates insights and
                    expands upon your text.
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    <Button variant="outline">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Content
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Tip: Review the AI suggestions carefully and integrate them
                    as needed.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">
                    Summarize Content with AI
                  </h4>
                  <p className="text-sm text-gray-600">
                    Quickly enhance your text with insights and analysis
                    generated by AI.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <span className="font-medium">Write</span> your text and
                      hit
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
                          Expand Writing
                        </Button>
                      </span>
                    </li>
                    <li>
                      <span className="font-medium">Review</span> the AI{"'"}s
                      suggestions and integrate as needed.
                    </li>
                    <li>
                      <span className="font-medium">
                        Provide specific content
                      </span>{" "}
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
              )}
            </HoverCardContent>
          </>
        )}
      </HoverCard>
      <SummarizerDrawer
        contentSummarize={contentSummarize}
        contentSummarizeList={contentSummarizeList}
        isLoading={isLoading}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default AISummarizeContent;
