"use clinet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, Globe, List, ScanSearch } from "lucide-react";
import { useAIResponse } from "../../context/AIResponseContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { useState } from "react";

const MinimizableComponent = () => {
  const { topicsResponse } = useAIResponse();

  //   Split the topicsResponse string into an array of topics
  const topics = topicsResponse
    .split(/(?=\d\.)/)
    .map((topic: any) => topic.trim())
    .filter(Boolean);
  //   const topics = [
  //     "Evolution of car design and technology in Formula 1",
  //     "Current Formula 1 teams and manufacturers",
  //     "Overview of the Formula 1 Grand Prix race format",
  //     "Impact of regulations on Formula 1 competition",
  //     "Profiles of leading Formula 1 drivers and their careers",
  //   ];

  const accordionKey = topicsResponse
    ? "accordion-with-data"
    : "accordion-empty";

  return (
    <Accordion
      type="single"
      defaultValue={topicsResponse ? "item-1" : ""}
      key={accordionKey}
      collapsible
      className="w-full bg-white border border-gray-400 dropShadow-3xl rounded-t-2xl px-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <List /> Topics
        </AccordionTrigger>
        <AccordionContent>
          {topicsResponse ? (
            <ul className="font-medium text-sm my-6 ml-6 list-disc [&>li]:mt-2">
              {topics.map((topic: string, index: number) => (
                <li
                  key={index}
                  className="flex flex-col w-[90%] items-center justify-between gap-3"
                >
                  <div className="w-full h-[1px] bg-gray-400"></div>
                  <div className="flex justify-between gap-3">
                    {topic}

                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          className="w-10 h-10 bg-transparent"
                          variant="outline"
                          size="icon"
                        >
                          <ScanSearch />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <Globe />
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Search on Web
                            </h4>
                            <p className="text-sm">
                              The React Framework – created and maintained by
                              @vercel.
                            </p>
                            <div className="flex items-center pt-2">
                              <ScanSearch className="mr-2 h-4 w-4 opacity-70" />{" "}
                              <span className="text-xs text-muted-foreground">
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xl text-center text-muted-foreground">
                No Topics Yet.
              </p>
              <p className="text-md text-center flex flex-col items-center justify-center text-gray-400">
                Topics will be displayed after you generate content with
                <Button
                  variant="outline"
                  className="flex text-sm items-center gap-2"
                >
                  <BrainCircuit size={14} /> Get AI Help
                </Button>
              </p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MinimizableComponent;
