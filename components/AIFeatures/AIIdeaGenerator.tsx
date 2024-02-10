import React from "react";
import { Button } from "../ui/button";
import { Lightbulb, Sparkle } from "lucide-react";

const AIIdeaGenerator = () => {
  return (
    <div>
      <Button variant="outline" className="flex items-center gap-2">
        <div className="flex items-center">
          <Sparkle size={12} className="self-start" />
          <Lightbulb />
          <Sparkle size={12} className="self-end" />
        </div>{" "}
        Generate Ideas
      </Button>
    </div>
  );
};

export default AIIdeaGenerator;
