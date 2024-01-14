import { Button } from "../ui/button";
import {
  AArrowUp,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
  PanelRightOpen,
  PencilRuler,
  Sparkle,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DrawerTypes {
  contentSummarize: string;
  contentSummarizeList: string;
  isLoading: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const SummarizerDrawer = ({
  contentSummarize,
  contentSummarizeList,
  isLoading,
  isDrawerOpen,
  setIsDrawerOpen,
}: DrawerTypes) => {
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="w-[1px] h-7 bg-gray-500"></div>
        <Button
          className="p-2 text-white bg-black rounded flex gap-2 items-center"
          onClick={() => toggleDrawer(true)}
        >
          <PanelRightOpen />
          Toggle Drawer
        </Button>
      </div>

      <div
        className={`fixed top-0 right-0 w-full min-h-screen max-w-md overflow-y-scroll bg-gray-100 p-4 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex items-start justify-between border-b-2 ">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0  text-center">
              Summarized content
            </h1>
            <Button onClick={() => toggleDrawer(false)}>
              <X />
            </Button>
          </div>
          {isLoading && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
          {contentSummarize ||
            (contentSummarizeList ? (
              <ScrollArea className="h-[80vh] w-full rounded-md border px-4 py-5">
                {isLoading && (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
                {!contentSummarize ||
                  (!contentSummarizeList && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="font-bold">
                        Summerize Content
                      </AlertTitle>
                      <AlertDescription className="flex flex-col items-center justify-center">
                        <p className="leading-7 text-lg [&:not(:first-child)]:mt-6">
                          No content yet, Content will appare after you
                          <div className="flex gap-2 items-center">
                            click
                            <Button
                              variant="outline"
                              className="flex text-sm items-center gap-1"
                            >
                              <div className="flex items-center">
                                <Sparkle size={10} className="self-start" />
                                <PencilRuler size={16} />
                                <Sparkle size={10} className="self-end" />
                              </div>{" "}
                              Summerize Content
                            </Button>
                          </div>
                        </p>
                      </AlertDescription>
                    </Alert>
                  ))}

                {contentSummarize && (
                  <div className="summary-content">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Summary:
                    </h3>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {contentSummarize}
                    </h4>
                  </div>
                )}
                {contentSummarizeList && (
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {contentSummarizeList.split("\n").map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* {contentSummarizeList
                  .split(/\d+\./)
                  .filter((item) => item.trim())
                  .map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))} */}
              </ScrollArea>
            ) : (
              <div className="space-y-3 bg-white p-4 rounded-md border">
                <h4 className="text-lg font-semibold">
                  Content Summary with AI
                </h4>
                <p className="text-sm text-gray-600">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                      Currently, there is no summarized content.,
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      To use the{" "}
                      <span className="font-bold">{"Summarize Content"}</span>{" "}
                      feature, please input or paste the text you want to
                      summarize in the editor. This will enable the AI to
                      process your content and provide a concise summary.
                      <br />{" "}
                      <span className="font-bold flex flex-col gap-3">
                        In case you close drawer component you can always access
                        it by clicking
                        <Button
                          onClick={() => toggleDrawer(false)}
                          className="p-2 text-white bg-black rounded flex gap-2 items-center"
                        >
                          <PanelRightOpen />
                          Toggle Drawer
                        </Button>
                      </span>{" "}
                    </AlertDescription>
                  </Alert>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Input</span> your text into
                    the editor and then click
                    <span className="font-medium">
                      <div className="py-2">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center">
                            <Sparkle size={12} className="self-start" />
                            <PencilRuler />
                            <Sparkle size={12} className="self-end" />
                          </div>{" "}
                          Summerize Content
                        </Button>
                      </div>
                    </span>
                    to initiate the AI-powered summarization process. Upon
                    clicking, a drawer will appear from the right side of your
                    screen, displaying the concise summary generated by the AI.
                  </li>
                  <li>
                    <span className="font-medium">Review</span> the summarized
                    content provided by the AI.
                  </li>
                  <li>
                    <span className="font-medium">Edit and refine </span>
                    the summary as needed for your specific use case.
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline flex items-center"
                >
                  <ExternalLink size={16} className="mr-1" /> More details
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SummarizerDrawer;
