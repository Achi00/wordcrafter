"use client";
import { useEffect, useState } from "react";
import ChatBox from "../../components/chat/ChatBox";
import { startChat } from "@/lib/AiChat";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ChatList from "@/components/chat/ChatList";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface UserProps {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

const Page = () => {
  const { isLoggedIn, loading } = useAuth();
  const [chatId, setChatId] = useState<string>("");
  const [userData, setUserData] = useState<UserProps | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn && !loading) {
        try {
          const response = await fetch("http://localhost:8080/v1/users", {
            method: "GET",
            credentials: "include", // Important for sessions
          });
          if (response.ok) {
            const data: UserProps = await response.json();
            setUserData(data);
          } else {
            throw new Error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [isLoggedIn, loading]); // Re-fetch when isLoggedIn or loading changes

  const handleNewChat = async () => {
    if (userData && userData._id) {
      try {
        const chatData = await startChat(userData._id);
        setChatId(chatData._id);
        // Navigate to the new chat route using the chat ID
        router.push(`/chat/code/${chatData._id}`);
      } catch (error) {
        console.error("Failed to start chat:", error);
      }
    } else {
      console.error("User ID is undefined or user is not logged in");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-full flex items-center justify-center h-screen">
        <div className="flex flex-col p-5 justify-start">
          <Button
            variant="outline"
            onClick={handleNewChat}
            disabled={!userData}
          >
            {!userData ? (
              <p>Please wait...</p>
            ) : (
              <p className="flex items-center gap-2">
                <MessageSquarePlus /> New Chat
              </p>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
