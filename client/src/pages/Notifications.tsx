import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Wallet, UserPlus, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchNotifications(parsedUser.id);
    }
  }, []);

  const fetchNotifications = async (userId: string) => {
    try {
      const response = await fetch(`/api/notifications/${userId}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    try {
      await fetch(`/api/notifications/${user.id}/read-all`, {
        method: "POST",
      });
      
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      
      toast({
        title: "تم",
        description: "تم وضع علامة على جميع الإشعارات كمقروءة",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث الإشعارات",
        variant: "destructive",
      });
    }
  };

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const then = new Date(createdAt);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    if (seconds < 60) return "الآن";
    if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`;
    if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`;
    return `منذ ${Math.floor(seconds / 86400)} يوم`;
  };

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
        <Button variant="outline" onClick={handleMarkAllAsRead} data-testid="button-mark-all-read">
          <CheckCheck className="h-4 w-4 mr-2" />
          وضع علامة على الكل كمقروء
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={!notification.read ? "border-primary/50" : ""}
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
                    {!notification.read && (
                      <Badge variant="default" className="flex-shrink-0">
                        جديد
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getTimeAgo(notification.createdAt)}
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
