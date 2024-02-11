import SignUp from "@/components/auth/SignUp";
import React from "react";
import Logo from "../../assets/wordcrafter-w.png";
import Image from "next/image";
import {
  BrainCircuit,
  CloudCog,
  Code2,
  FileCode,
  FileStack,
  GanttChart,
  Github,
  Link,
  Router,
} from "lucide-react";
import Notification from "@/components/auth/Notifitacion";

const page = () => {
  return (
    <div className="w-full h-screen bg-[#18181B] flex">
      <Notification />
      <div className="absolute top-0 left-0 p-6 xl:p-5 lg:p-6 md:p-8 sm:p-5 text-white bg-[#18181B] w-full xl:w-1/2 lg:w-1/2 md:w-1/2">
        <Image src={Logo} alt="wordcrafter" width={250} height={150} />
      </div>
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="hidden flex-col md:flex md:w-1/2 items-center justify-center p-8 text-white xl:gap-10 lg:gap-10 md:gap-7 sm:gap-5 xs:gap-2 px-10 pt-16">
          <div className="flex flex-col w-full">
            <h1 className="scroll-m-20 border-b pb-2 xl:text-xl lg:text-lg md:text-lg sm:text-md xs:text-md font-semibold tracking-tight first:mt-0 w-full flex items-center gap-3">
              <GanttChart /> Programming
            </h1>
            <div className="flex flex-col gap-4 p-6">
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <FileCode />
                  Dynamic Code Execution:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    Run JavaScript code snippets with support for all npm
                    packages.
                  </span>
                </div>
              </h2>
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <BrainCircuit />
                  AI-Assisted Coding:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    AI powered real-time coding assistance, including syntax
                    correction, code suggestions, and optimization tips.
                  </span>
                </div>
              </h2>
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <Github />
                  Connect With Github:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    Create and manage GitHub repositories directly from the
                    application.
                  </span>
                </div>
              </h2>
            </div>
          </div>
          {/* research */}
          <div className="flex flex-col w-full">
            <h1 className="scroll-m-20 border-b pb-2 xl:text-xl lg:text-lg md:text-lg sm:text-md xs:text-md font-semibold tracking-tight first:mt-0 w-full flex items-center gap-3">
              <CloudCog /> Research
            </h1>
            <div className="flex flex-col gap-4 p-6">
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <Router />
                  Web Search and Analysis:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    Enter a URL and receive an AI-generated summary, key
                    insights, and resources.
                  </span>
                </div>
              </h2>
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <FileStack />
                  Content Insight and Resource Compilation:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    AI powered real-time coding assistance, including syntax
                    correction, code suggestions, and optimization tips.
                  </span>
                </div>
              </h2>
              <h2 className="text-left xl:text-[1vw] lg:text-[1vw] md:text-xs sm:text-xs xs:text-xs">
                <strong className="flex items-center gap-3">
                  <Link />
                  Strategic Resource Aggregation:
                </strong>{" "}
                <div className="pl-9 leading-7">
                  <span>
                    Dive deeper into your research with {"AI's"} ability to
                    extract, organize, and present a curated list of external
                    resources.
                  </span>
                </div>
              </h2>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default page;
