"use clinet";
import React, { useState } from "react";
import { useAIResponse } from "../context/AIResponseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BrainCircuit,
  Calculator,
  ExternalLink,
  SendHorizontal,
  ScanSearch,
  PencilLine,
  Route,
  ListTodo,
  SlidersHorizontal,
  BookOpenText,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const AIPromptDialog = () => {
  const { setIntroResponse, setTopicsResponse } = useAIResponse();

  const [userInput, setUserInput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("default");
  const [showIcon, setshowIcon] = useState(true);
  const [chunks, setChunks] = useState<string>("");
  const [topics, setTopics] = useState<string>("");
  const [intro, setIntro] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setTopicsResponse("");
      setIntroResponse("");
      const response = await fetch("http://localhost:8080/startwithai", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userInput,
          preset: selectedPreset,
        }),
      });
      if (!response.ok || !response.body) {
        throw response.statusText;
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

        // Process all chunks except the last, which might be incomplete
        for (let i = 0; i < chunks.length - 1; i++) {
          try {
            const parsedChunk = JSON.parse(chunks[i]);
            // Update state based on the type of chunk
            if (parsedChunk.type === "topics") {
              // Update state for topics
              setTopicsResponse(
                (prevTopics: string) => prevTopics + parsedChunk.content
              );
            } else if (parsedChunk.type === "intro") {
              // Update state for intro paragraph
              setIntroResponse(
                (prevIntro: string) => prevIntro + parsedChunk.content
              );
            }
          } catch (e) {
            console.error("Error parsing chunk: ", e);
          }
        }

        // Keep the last chunk in the buffer in case it's incomplete
        buffer = chunks[chunks.length - 1];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectChange = (value: string) => {
    setshowIcon(false);
    setSelectedPreset(value);
    console.log(selectedPreset);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <BrainCircuit size={18} /> Get AI Help
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mt-3">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none flex gap-2 items-center">
                <BrainCircuit />
                <h2 className="scroll-m-20 border-b text-xl font-semibold tracking-tight first:mt-0">
                  AI Assistance
                </h2>
              </h4>
              <p className="text-sm text-muted-foreground">
                Enter the topic you want to write about and AI will help you to
                get started
              </p>
            </div>
            <div className="text-left">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="flex gap-2 text-[#495057]">
                    <ExternalLink size={11} color="#495057" /> How To Use?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">How To Use?</h4>
                      <p className="text-sm flex flex-col gap-2">
                        After submitting AI will start generating based on
                        prompt and preset you choose, content will be in two
                        parts.
                        <br />
                        <div className="w-full h-[1px] bg-gray-600"></div>
                        1. General content
                        <br />
                        2. Topics to consider while writing
                        <div className="w-full h-[1px] bg-gray-600"></div>
                      </p>
                      <div className="flex items-center pt-2 gap-2">
                        <ExternalLink size={16} color="#495057" />{" "}
                        <span className="flex items-center text-md text-muted-foreground">
                          <p className="text-black font-bold text-sm">
                            For more details click
                          </p>
                          <Button
                            variant="link"
                            className="w-[50px] text-[#22337d]"
                          >
                            Here
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Select onValueChange={selectChange}>
              <SelectTrigger className="w-full">
                {showIcon && <Route />}
                <SelectValue placeholder="Presets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  <div className="flex items-center justify-between gap-3">
                    <SlidersHorizontal />
                    <p className="font-bold">Default</p> <p> Most Balanced</p>
                  </div>
                </SelectItem>
                <SelectItem value="essay">
                  <div className="flex items-center justify-between gap-3">
                    <BookOpenText />
                    <p className="font-bold">essay</p>{" "}
                    <p> informative and structured</p>
                  </div>
                </SelectItem>
                <SelectItem value="math">
                  <div className="flex items-center gap-3 text-center">
                    <Calculator />
                    <p className="font-bold">Math</p> <p>Solves Equations</p>
                  </div>
                </SelectItem>
                <SelectItem value="research">
                  <div className="flex items-center gap-3">
                    <ScanSearch />
                    <p className="font-bold">Research</p> <p> Analyzes Data</p>
                  </div>
                </SelectItem>
                <SelectItem value="writing">
                  <div className="flex items-center justify-between gap-3">
                    <PencilLine />
                    <p className="font-bold">Writing</p> <p> Generates Ideas</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="grid gap-2">
              <div className="flex flex-col gap-3">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type something..."
                  autoFocus
                />
                <Button onClick={handleSubmit}>
                  <SendHorizontal className="mr-2 h-4 w-4" /> Submit
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {topics !== "" ? (
        <div className="absolute w-1/3 bottom-0 border-t border-gray-300 pt-4">
          <h2 className="text-xl font-bold mb-2">Topics</h2>
          <p>{topics}</p>
        </div>
      ) : null}
    </>
  );
};

export default AIPromptDialog;
