import { useState } from "react";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Match() {
  const [matchType, setMatchType] = useState<"chat" | "voice">("chat");
  const { toast } = useToast();

  const handleMatch = () => {
    toast({
      title: "Connecting...",
      description: `Finding someone for a ${matchType} match`,
    });
    console.log("Match initiated:", matchType);
  };

  const handleNext = () => {
    toast({
      description: "Looking for another match...",
    });
    console.log("Next match:", matchType);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Random Match</h1>
        <p className="text-muted-foreground">Connect with someone new</p>
      </div>

      <Tabs defaultValue="chat" onValueChange={(v) => setMatchType(v as "chat" | "voice")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="chat" data-testid="tab-match-chat">Chat Match</TabsTrigger>
          <TabsTrigger value="voice" data-testid="tab-match-voice">Voice Match</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-6">
          <MatchCard type="chat" onMatch={handleMatch} onNext={handleNext} />
        </TabsContent>
        <TabsContent value="voice" className="mt-6">
          <MatchCard type="voice" onMatch={handleMatch} onNext={handleNext} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
