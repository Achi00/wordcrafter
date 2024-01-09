"use clinet";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, ExternalLink, SendHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AIPromptDialogProps {
  //   onTrigger: (openDialog: () => void) => JSX.Element;
  onSubmit: (userInput: string) => void;
  // position: { top: number; left: number };
  // isOpen: boolean;
}

const AIPromptDialog = ({
  onSubmit,
}: // position,
// isOpen,
AIPromptDialogProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    onSubmit(userInput);
    setUserInput(""); // Reset input field after submission
  };

  // Only render the Popover when isOpen is true
  // if (!isOpen) {
  //   return null;
  // }

  // const popoverStyle: React.CSSProperties = {
  //   position: "absolute", // Ensure this matches the expected type
  //   top: position.top,
  //   left: position.left,
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Get AI Help</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center">
              <BrainCircuit /> AI Assistance
            </h4>
            <p className="text-sm text-muted-foreground">
              Enter your prompt below and the AI will assist you.
            </p>
          </div>
          <div className="text-left">
            <Button variant="link" className="flex gap-2 text-[#495057]">
              <ExternalLink size={11} color="#495057" /> How To Use?
            </Button>
          </div>
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
