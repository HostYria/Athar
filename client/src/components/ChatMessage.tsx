import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
  isSelf?: boolean;
  avatarUrl?: string;
}

export default function ChatMessage({
  message,
  sender,
  timestamp,
  isSelf = false,
  avatarUrl,
}: ChatMessageProps) {
  const initials = sender
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isSelf && "flex-row-reverse"
      )}
      data-testid={`message-${isSelf ? 'self' : 'other'}`}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 ring-2 ring-white/20">
          <AvatarImage src={avatarUrl} alt={sender} />
          <AvatarFallback className="gradient-primary text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!isSelf && (
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>
      
      <div className={cn("flex flex-col max-w-xs", isSelf && "items-end")}>
        {!isSelf && (
          <div className="text-sm font-semibold mb-1 px-1">{sender}</div>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 break-words backdrop-blur-xl shadow-lg",
            isSelf
              ? "gradient-primary text-white rounded-tr-sm"
              : "bg-white/70 dark:bg-white/5 text-foreground border border-white/20 dark:border-white/10 rounded-tl-sm"
          )}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <div className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</div>
      </div>
    </div>
  );
}
