import React from "react";
import { Button } from "./ui/button";
import { AArrowUp, Sparkle } from "lucide-react";

const AIExpandContent = () => {
  return (
    <div className="relative">
      <Button variant="outline" className="flex items-center gap-2">
        <div className="flex items-center">
          <Sparkle size={12} className="self-start" />
          <AArrowUp />
          <Sparkle size={12} className="self-end" />
        </div>{" "}
        Expand your writing
      </Button>
    </div>
  );
};

export default AIExpandContent;
