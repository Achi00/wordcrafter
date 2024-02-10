import Editor from "@/components/Editor";
import { AIResponseProvider } from "../context/AIResponseContext";

export default function Home() {
  return (
    // <AIResponseProvider>
    <div className="flex w-full min-h-screen flex-col">
      <Editor />
    </div>
    // </AIResponseProvider>
  );
}
