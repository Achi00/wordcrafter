import React from "react";
import Logo from "../assets/wordcrafter.png";
import Image from "next/image";
import { MessageSquareText } from "lucide-react";
import ChatList from "./chat/ChatList";

const Sidebar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <a
          href="#"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <span className="ml-3 text-base font-semibold">
            <Image src={Logo} width={250} height={250} alt="wordcrafter" />
          </span>
        </a>
        <ul className="space-y-2 text-sm font-medium">
          <h1 className="flex gap-3 items-center fonte-bold text-xl border-b border-black p-2">
            <MessageSquareText />
            Previous chats
          </h1>
          <li>
            <ChatList />
          </li>
        </ul>
        <div className="mt-auto flex">
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium text-black dark:text-white">
              email@example.com
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-roledescription="more menu"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 text-black dark:text-white"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
