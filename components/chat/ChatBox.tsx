"use client";
import { useEffect, useState } from "react";
import { sendMessage } from "../../lib/AiChat";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, BrainCircuit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthContext";
import { fetchUserInfo } from "@/lib/User";
import { UserProps } from "@/types/UserProps";
import Image from "next/image";
import gptIcon from "@/assets/gpt_icon.jpg";

interface MessageProps {
  sender: string;
  content: string;
}

interface ChatBoxProps {
  chatId: string;
  initialMessages: MessageProps[];
}

const ChatBox = ({ chatId, initialMessages }: ChatBoxProps) => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ongoingAIResponse, setOngoingAIResponse] = useState("");
  const [userData, setUserData] = useState<UserProps>();
  const { isLoggedIn, loading } = useAuth();

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
  }, [isLoggedIn, loading]);

  console.log(userData?.picture);

  // const getUserData = async () => {
  //   const userData = await fetchUserInfo();
  //   return userData;
  // };

  // console.log("user:" + getUserData);

  // Initialize messages state with initialMessages when the component mounts or chatId changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, chatId]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    setMessages((prev) => [...prev, { sender: "user", content: userInput }]);
    setUserInput("");

    try {
      const streamResponse = await sendMessage(chatId, "user", userInput);

      if (streamResponse.body) {
        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();
        let fullAIResponse = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break; // Stream completed
          }

          const chunk = decoder.decode(value, { stream: true });
          // console.log("Received chunk:", chunk);

          const lines = chunk.split("\n");
          lines.forEach((line) => {
            if (line) {
              try {
                const parsedChunk = JSON.parse(line);

                if (
                  parsedChunk.type === "aiResponse" &&
                  parsedChunk.content.trim()
                ) {
                  fullAIResponse += parsedChunk.content.trim() + " "; // Combine chunks
                  console.log("fullAIResponse:" + fullAIResponse);
                  setOngoingAIResponse(fullAIResponse);
                }
              } catch (e) {
                console.error("Error parsing chunk: ", e);
              }
            }
          });

          if (done) {
            // Only update messages when the full AI response is received
            if (fullAIResponse) {
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "assistant", content: fullAIResponse },
              ]);
            }
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); // Ensure loading state resets
    }
  };

  return (
    <div className="flex flex-col w-1/2 items-center justify-center gap-5">
      <ScrollArea className="h-[80vh] w-full p-4">
        {messages.map((msg: MessageProps, index: number) => (
          <p key={index}>
            <strong className="flex items-center gap-1">
              {userData && (
                <Image
                  className="rounded-lg"
                  src={`${userData?.picture}`}
                  alt="wordcrafter"
                  width="30"
                  height="30"
                />
              )}
              {msg.sender}:
            </strong>{" "}
            {msg.content}
            <Separator className="my-4" />
          </p>
        ))}
        {/* Display ongoing AI response here */}
        {ongoingAIResponse && (
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={gptIcon}
                width={30}
                height={30}
                alt="wordcrafter"
                className="rounded-lg"
              />
              <strong>AI:</strong>
            </div>
            <p className="flex items-center gap-1">{ongoingAIResponse}</p>
          </div>
        )}
      </ScrollArea>
      {/* <ScrollArea className="h-[80vh] w-full p-4">
        {messages.map((msg: MessageProps, index: number) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </ScrollArea> */}
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="Type your message here."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button onClick={handleSendMessage} disabled={isLoading || !userInput}>
          <ArrowUp className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
