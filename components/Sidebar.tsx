"use client";
import React, { useEffect, useState } from "react";
import Logo from "../assets/wordcrafter.png";
import Image from "next/image";
import {
  MessageSquareCode,
  MessageSquarePlus,
  MessageSquareText,
  MoreHorizontal,
} from "lucide-react";
import ChatList from "./chat/ChatList";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProps {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

const Sidebar = ({ handleNewChat }: any) => {
  const { isLoggedIn, loading } = useAuth();
  const [userData, setUserData] = useState<UserProps>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/users", {
          method: "GET",
          credentials: "include", // Important for sessions
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <a
          href="#"
          className="mb-1 flex items-center rounded-lg px-3 pt-2 text-slate-900 dark:text-white"
        >
          <span className="ml-3 text-base font-semibold">
            <Image src={Logo} width={250} height={250} alt="wordcrafter" />
          </span>
        </a>
        <div className="flex flex-col py-5 justify-start gap-4">
          <Button
            variant="outline"
            onClick={handleNewChat}
            disabled={!userData}
          >
            {!userData ? (
              <p>Please wait...</p>
            ) : (
              <p className="flex w-full items-center gap-2 justify-start">
                <MessageSquarePlus /> New Chat
              </p>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleNewChat}
            disabled={!userData}
          >
            {!userData ? (
              <p>Please wait...</p>
            ) : (
              <p className="flex w-full items-center gap-2 justify-start">
                <MessageSquareCode /> New Editor
              </p>
            )}
          </Button>
        </div>
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
            <div className="flex items-center gap-5">
              {isLoggedIn && (
                <>
                  {userData && (
                    <div className="flex items-center gap-2 p-2">
                      <Image
                        width={25}
                        height={25}
                        src={userData.picture}
                        alt="User"
                        className="rounded-full"
                      />
                      <h3 className="scroll-m-20 text-md font-semibold tracking-tight">
                        {userData.name}
                      </h3>
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Billing
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Keyboard shortcuts
                          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Invite users
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>Email</DropdownMenuItem>
                              <DropdownMenuItem>Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                          New Team
                          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuItem disabled>API</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
