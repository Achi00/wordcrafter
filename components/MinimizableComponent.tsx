"use clinet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { List, ScanSearch } from "lucide-react";
import { useAIResponse } from "../context/AIResponseContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

const MinimizableComponent = () => {
  const { topicsResponse } = useAIResponse();

  // Split the topicsResponse string into an array of topics
  //   const topics = topicsResponse
  //     .split(/(?=\d\.)/)
  //     .map((topic: any) => topic.trim())
  //     .filter(Boolean);
  const topics = [
    "Evolution of car design and technology in Formula 1",
    "Current Formula 1 teams and manufacturers",
    "Overview of the Formula 1 Grand Prix race format",
    "Impact of regulations on Formula 1 competition",
    "Profiles of leading Formula 1 drivers and their careers",
  ];
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-200 rounded-t-2xl px-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <List /> Topics
        </AccordionTrigger>
        <AccordionContent>
          {!topicsResponse ? (
            <ul className="font-medium text-sm my-6 ml-6 list-disc [&>li]:mt-2">
              {topics.map((topic: string, index: number) => (
                <li
                  key={index}
                  className="flex flex-col w-[90%] items-center justify-between gap-3"
                >
                  <div className="w-full h-[1px] bg-gray-400"></div>
                  <div className="flex justify-between gap-3">
                    {topic}
                    <Button className="w-10 h-10" variant="outline" size="icon">
                      <ScanSearch />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xl text-center text-muted-foreground">
                No Topics Yet.
              </p>
              <p className="text-md text-center text-gray-400">
                Topics will be displayed after generating content
              </p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MinimizableComponent;
