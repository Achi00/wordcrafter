import { useState } from "react";
import { sendMessage } from "../../lib/AiChat";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, SendHorizontal } from "lucide-react";

interface MessageProps {
  sender: string;
  content: string;
}

const ChatBox = ({ chatId }: { chatId: string }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([]);

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
      {/* <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      /> */}
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
