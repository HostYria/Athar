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
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              <Shuffle className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Random Match</h3>
          <p className="text-muted-foreground">
            Connect with someone new for a {type === "chat" ? "conversation" : "voice call"}
          </p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={onMatch} className="gap-2" data-testid="button-connect">
            {type === "chat" ? (
              <MessageSquare className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            Connect
          </Button>
          <Button variant="outline" onClick={onNext} data-testid="button-next-match">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
