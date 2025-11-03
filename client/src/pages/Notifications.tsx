import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Wallet, UserPlus, CheckCheck } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from Sarah Ahmed",
      description: "Hey! How are you doing today?",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "wallet",
      title: "Transaction Successful",
      description: "You received 50 USD",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "friend",
      title: "New friend request",
      description: "Ahmed Ali wants to connect with you",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "wallet",
      title: "ATH Purchase Complete",
      description: "Bought 5,000 ATH for 5 USD",
      time: "5 hours ago",
      unread: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "wallet":
        return <Wallet className="h-5 w-5" />;
      case "friend":
        return <UserPlus className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your activity</p>
        </div>
        <Button variant="outline" data-testid="button-mark-all-read">
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.unread ? "border-primary/50" : ""}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {getIcon(notification.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold" data-testid={`text-notification-title-${notification.id}`}>
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <Badge variant="default" className="flex-shrink-0">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
