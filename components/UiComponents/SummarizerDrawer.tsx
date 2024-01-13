import { Button } from "../ui/button";
import { AlertCircle, Loader2, PencilRuler, Sparkle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DrawerTypes {
  contentSummarize: string;
  isLoading: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const SummarizerDrawer = ({
  contentSummarize,
  isLoading,
  isDrawerOpen,
  setIsDrawerOpen,
}: DrawerTypes) => {
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="relative">
      {/* {contentSummarize && ( */}
      <Button
        className="p-2 text-white bg-blue-500 rounded"
        onClick={() => toggleDrawer(true)}
      >
        Toggle Drawer
      </Button>
      {/* )} */}

      <div
        className={`fixed top-0 right-0 w-1/4 min-h-screen overflow-y-auto bg-gray-100 p-4 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-5 gap-10">
          <h1 className="scroll-m-20 border-b-2 pb-2 text-4xl font-semibold tracking-tight first:mt-0  text-center">
            Summarized content
          </h1>
          {isLoading && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
          {!contentSummarize && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Summerize Content</AlertTitle>
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
          )}

          {!isLoading && contentSummarize && (
            <div className="summary-content">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Summary:
              </h3>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {contentSummarize}
              </h4>
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-center absolute bottom-5">
          <Button className="w-15" onClick={() => toggleDrawer(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummarizerDrawer;
