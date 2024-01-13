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
  Loader2,
  BrainCircuitIcon,
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
import { PopoverClose } from "@radix-ui/react-popover";

const AIPromptDialog = () => {
  const { setIntroResponse, setTopicsResponse } = useAIResponse();

  const [userInput, setUserInput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("default");
  const [showIcon, setshowIcon] = useState(true);
  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    try {
      setloading(true);
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
      setloading(false);
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
                    <ExternalLink size={11} color="#495057" /> How To Use AI
                    Assistance?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">
                      AI Writing Assistant
                    </h4>
                    <p className="text-sm text-gray-600">
                      Kickstart your writing process with the push of a button.
                      Enter a topic, and let AI craft a beginning to inspire
                      your work.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Enter a Prompt:</span>{" "}
                        Start with a word, question, or sentence.
                      </li>
                      <li>
                        <span className="font-medium">Generate Content:</span>{" "}
                        Receive AI-generated text to develop your ideas.
                      </li>
                      <li>
                        <span className="font-medium">Recive Topics:</span>{" "}
                        After submission, you will also receive a list of topics
                        that you can consider when writing.
                      </li>
                    </ul>
                    <a
                      href="#"
                      className="text-indigo-600 hover:underline flex items-center"
                    >
                      <ExternalLink size={16} className="mr-1" /> Get more tips
                    </a>
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
                <PopoverClose asChild>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SendHorizontal className="mr-2 h-4 w-4" /> Submit
                      </div>
                    )}
                  </Button>
                  {/* <Button disabled={loading}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button> */}
                </PopoverClose>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AIPromptDialog;
