import Editor from "@/components/Editor";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen flex-col p-10">
      <Editor />
    </div>
  );
}
