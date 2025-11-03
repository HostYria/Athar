import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shuffle, MessageSquare, Mic } from "lucide-react";

interface MatchCardProps {
  onMatch?: () => void;
  onNext?: () => void;
  type?: "chat" | "voice";
}

export default function MatchCard({
  onMatch,
  onNext,
  type = "chat",
}: MatchCardProps) {
  return (
    <Card className="max-w-lg mx-auto rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full blur-3xl" />
      <CardContent className="p-12 text-center space-y-8 relative">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32 shadow-2xl ring-4 ring-white/20">
              <AvatarFallback className="gradient-primary text-white">
                <Shuffle className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 gradient-primary opacity-20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold gradient-text mb-3">Random Match</h3>
          <p className="text-muted-foreground text-lg">
            Connect with someone new for a {type === "chat" ? "conversation" : "voice call"}
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={onMatch} className="gap-2 rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all px-8" data-testid="button-connect">
            {type === "chat" ? (
              <MessageSquare className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
            Connect
          </Button>
          <Button variant="outline" onClick={onNext} className="rounded-full backdrop-blur-sm bg-white/50 dark:bg-white/10 border-white/20 hover:bg-white/80 dark:hover:bg-white/20 px-8" data-testid="button-next-match">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
