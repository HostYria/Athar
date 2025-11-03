import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, UserMinus } from "lucide-react";

export default function Friends() {
  const friends = [
    { id: 1, name: "Sarah Ahmed", username: "@sarah_a", status: "online" as const },
    { id: 2, name: "Ahmed Ali", username: "@ahmed_ali", status: "away" as const },
    { id: 3, name: "Fatima Hassan", username: "@fatima_h", status: "online" as const },
    { id: 4, name: "Omar Khalil", username: "@omar_k", status: "offline" as const },
    { id: 5, name: "Layla Ibrahim", username: "@layla_i", status: "online" as const },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Friends</h1>
        <p className="text-muted-foreground">Manage your connections</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
          className="pl-10"
          data-testid="input-search-friends"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <Card key={friend.id} className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(friend.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                      friend.status === "online"
                        ? "bg-status-online"
                        : friend.status === "away"
                        ? "bg-status-away"
                        : "bg-status-offline"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate" data-testid={`text-friend-name-${friend.id}`}>
                    {friend.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {friend.username}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" className="flex-1" data-testid={`button-message-${friend.id}`}>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" data-testid={`button-remove-${friend.id}`}>
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
