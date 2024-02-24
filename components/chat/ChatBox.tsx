import { useEffect, useState } from "react";
import { sendMessage } from "../../lib/AiChat";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, SendHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";

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

  // Initialize messages state with initialMessages when the component mounts or chatId changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, chatId]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", content: userInput }]);
    setUserInput("");

    try {
      const streamResponse = await sendMessage(chatId, "user", userInput);
      if (streamResponse.body) {
        const reader = streamResponse.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break; // Stream completed
          }

          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split("\n");

          // Process all chunks except the last, which might be incomplete
          for (let i = 0; i < chunks.length - 1; i++) {
            try {
              const parsedChunk = JSON.parse(chunks[i]);
              console.log(parsedChunk);
              // Assuming parsedChunk.type could be "aiResponse" for simplicity
              if (parsedChunk.type === "aiResponse" && parsedChunk.content) {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  { sender: "assistant", content: parsedChunk.content },
                ]);
              }
            } catch (e) {
              console.error("Error parsing chunk: ", e);
            }
          }

          // Keep the last chunk in the buffer in case it's incomplete
          buffer = chunks[chunks.length - 1];
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset after operation
    }
  };

  return (
    <div className="flex flex-col w-1/2 items-center justify-center gap-5">
      <ScrollArea className="h-[80vh] w-full p-4">
        {messages.map((msg: MessageProps, index: number) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </ScrollArea>
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
