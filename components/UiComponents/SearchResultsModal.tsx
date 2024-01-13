"use clinet";
// AIPromptDialog.js
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, SendHorizontal } from "lucide-react";

interface AIPromptDialogProps {
  //   onTrigger: (openDialog: () => void) => JSX.Element;
  onSubmit: (userInput: string) => void;
}

const SearchResultsModal = ({ onSubmit }: AIPromptDialogProps) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    onSubmit(userInput);
    setUserInput(""); // Reset input field after submission
  };

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <SheetTitle className="flex items-center gap-3">
              <BrainCircuit /> AI Assistance
            </SheetTitle>
            <div className="w-full bg-black h-[1px]"></div>
            <SheetDescription>
              Enter your prompt below and the AI will assist you.
            </SheetDescription>
          </div>
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchResultsModal;
