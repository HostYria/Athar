import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, message: "Hey everyone! How's it going?", sender: "Sarah Ahmed", timestamp: "10:30 AM", isSelf: false },
    { id: 2, message: "Great! Just joined Athar.", sender: "You", timestamp: "10:32 AM", isSelf: true },
    { id: 3, message: "Welcome! This platform is amazing.", sender: "Ahmed Ali", timestamp: "10:33 AM", isSelf: false },
    { id: 4, message: "Thanks! Excited to be here.", sender: "You", timestamp: "10:35 AM", isSelf: true },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: message,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      },
    ]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl">
      <div className="mb-6">
        <h1 className="text-5xl font-bold gradient-text mb-3">Chat Room</h1>
        <p className="text-muted-foreground text-lg">Connect with the community</p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl overflow-hidden">
        <ScrollArea className="flex-1 p-8">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isSelf={msg.isSelf}
            />
          ))}
        </ScrollArea>

        <div className="p-6 border-t border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/30 dark:bg-white/5">
          <div className="flex gap-3">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-base px-6"
              data-testid="input-chat-message"
            />
            <Button onClick={handleSend} className="rounded-full h-12 w-12 p-0 gradient-primary text-white shadow-lg" data-testid="button-send-message">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
