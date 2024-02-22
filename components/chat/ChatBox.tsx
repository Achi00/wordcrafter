import { useEffect, useState } from "react";
import { sendMessage } from "../../lib/AiChat";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, SendHorizontal } from "lucide-react";

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

  // Initialize messages state with initialMessages when the component mounts or chatId changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, chatId]);

  const handleSendMessage = async () => {
    setUserInput("");
    if (!userInput.trim()) return;

    const response = await sendMessage(chatId, "user", userInput);
    setMessages([
      ...messages,
      { sender: "user", content: userInput },
      { sender: "assistant", content: response.fullAIResponse },
    ]);
  };

  return (
    <div className="flex flex-col w-1/2 items-center justify-center gap-5">
      <div>
        {messages.map((msg: MessageProps, index: number) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div className="flex w-full">
        <Textarea
          placeholder="Type your message here."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button onClick={handleSendMessage}>
          <ArrowUp className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
