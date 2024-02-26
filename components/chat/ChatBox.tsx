"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { sendMessage } from "../../lib/AiChat";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Code, Info } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthContext";
import { fetchUserInfo } from "@/lib/User";
import { UserProps } from "@/types/UserProps";
import Image from "next/image";
import gptIcon from "@/assets/gpt_icon.jpg";
import { parseAndStyleText } from "@/lib/ParseText";
import MarkdownRenderer from "@/lib/MarkdownRenderer";

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
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [userData, setUserData] = useState<UserProps>();
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  const { isLoggedIn, loading } = useAuth();

  const [fullAIResponse, setFullAIResponse] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Initialize messages state with initialMessages when the component mounts or chatId changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, chatId]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    setIsLoading(true);
    setShouldAutoScroll(true);
    setMessages((prev) => [...prev, { sender: "user", content: userInput }]);
    setUserHasScrolled(false);
    setUserInput("");
    setFullAIResponse(""); // Resetting AI response for new message

    try {
      const streamResponse = await sendMessage(chatId, "user", userInput);

      if (streamResponse.body) {
        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            setShouldAutoScroll(false);
            break; // Stream completed
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          lines.forEach((line) => {
            if (line) {
              try {
                const parsedChunk = JSON.parse(line);

                if (
                  parsedChunk.type === "aiResponse" &&
                  parsedChunk.content.trim()
                ) {
                  // Update fullAIResponse state
                  setFullAIResponse(
                    (prev) => prev + parsedChunk.content.trim() + " "
                  );
                }
              } catch (e) {
                console.error("Error parsing chunk: ", e);
              }
            }
          });
        }

        // After stream is complete, add AI response to messages
        if (fullAIResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "assistant", content: fullAIResponse.trim() },
          ]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); // Ensure loading state resets
    }
  };

  useEffect(() => {
    if (shouldAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, shouldAutoScroll]);

  // useEffect(() => {
  //   const div = scrollRef.current;

  //   if (!div) return;

  //   const onScroll = () => {
  //     // Assuming a 100px threshold from the bottom to re-enable auto-scrolling
  //     const isScrolledUp =
  //       div.scrollTop < div.scrollHeight - div.clientHeight - 100;
  //     setUserHasScrolled(isScrolledUp);
  //   };

  //   div?.addEventListener("scroll", onScroll);

  //   return () => div?.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <div className="flex flex-col w-1/2 items-center justify-center gap-5">
      <div
        className="h-[80vh] w-full p-4 overflow-auto scrollable-div"
        ref={scrollRef}
      >
        <div className="flex flex-col gap-8">
          {messages.map((msg: MessageProps, index: number) => (
            <Fragment key={index}>
              <div className="flex items-start gap-2">
                {msg.sender === "assistant" && (
                  <>
                    <Image
                      src={gptIcon} // Assuming gptIcon is the path to your image
                      width={30}
                      height={30}
                      alt="Assistant"
                      className="rounded-lg"
                    />
                    <div>
                      <strong>{msg.sender}:</strong>
                      <MarkdownRenderer content={msg.content} />
                    </div>
                  </>
                )}
                {msg.sender === "user" && userData && (
                  <>
                    <Image
                      src={`${userData?.picture}`} // Assuming this is the path to your image for the user
                      width={30}
                      height={30}
                      alt="User"
                      className="rounded-lg"
                    />
                    <p>
                      <strong>{msg.sender}:</strong> {msg.content}
                    </p>
                  </>
                )}
              </div>
              {/* Insert Separator after assistant's message */}
              {msg.sender === "assistant" && index !== messages.length - 1 && (
                <div className="flex flex-col  items-end">
                  <Separator className="my-4" />
                  <div className="flex w-1/6 gap-1 justify-end">
                    <Button variant="outline" size="icon">
                      <Info />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Code />
                    </Button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}

          {/* Displaying ongoing AI response */}
          {fullAIResponse && (
            <div className="flex items-start gap-2">
              <Image
                src={gptIcon}
                width={30}
                height={30}
                alt="wordcrafter"
                className="rounded-lg"
              />
              <p>
                <strong>assistant:</strong>{" "}
                <MarkdownRenderer content={fullAIResponse} />
              </p>
            </div>
          )}
        </div>
      </div>

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
