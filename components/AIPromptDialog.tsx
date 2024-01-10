"use clinet";
import React, { useState } from "react";
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

interface AIPromptDialogProps {
  onSubmit: (userInput: string) => void;
}

const AIPromptDialog = ({ onSubmit }: AIPromptDialogProps) => {
  const [userInput, setUserInput] = useState("");
  const [showIcon, setshowIcon] = useState(true);

  const handleSubmit = () => {
    onSubmit(userInput);
    setUserInput(""); // Reset input field after submission
  };

  const selectChange = () => {
    setshowIcon(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BrainCircuit size={18} /> Get AI Help
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mt-3">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center">
              <BrainCircuit /> AI Assistance
            </h4>
            <p className="text-sm text-muted-foreground">
              Enter your prompt below and the AI will assist you to start
              writing.
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
                    <h4 className="text-sm font-semibold">
                      Get AI Help to Start Writing
                    </h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                      <ListTodo className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
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
  );
};

export default AIPromptDialog;
