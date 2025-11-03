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
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} alt={sender} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col", isSelf && "items-end")}>
        {!isSelf && (
          <div className="text-sm font-medium mb-1">{sender}</div>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2 max-w-xs break-words",
            isSelf
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {message}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{timestamp}</div>
      </div>
    </div>
  );
}
