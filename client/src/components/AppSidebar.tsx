import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  Mic,
  Shuffle,
  Search,
  Settings,
  Bell,
  User,
  Users,
  MessageCircle,
  Wallet,
  Store,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { Link, useLocation } from "wouter";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Chat Room", url: "/chat", icon: MessageSquare },
  { title: "Voice Room", url: "/voice", icon: Mic },
  { title: "Match", url: "/match", icon: Shuffle },
  { title: "Search", url: "/search", icon: Search },
];

const personalItems = [
  { title: "My Account", url: "/account", icon: User },
  { title: "My Friends", url: "/friends", icon: Users },
  { title: "My Chat", url: "/my-chat", icon: MessageCircle },
  { title: "My Wallet", url: "/wallet", icon: Wallet },
];

const otherItems = [
  { title: "Store", url: "/store", icon: Store },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const [location] = useLocation();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  // تحديث بيانات المستخدم عند تغيير localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    // الاستماع لتغييرات localStorage
    window.addEventListener("storage", handleStorageChange);

    // التحقق من التحديثات كل 500ms
    const interval = setInterval(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const newUser = JSON.parse(userData);
        if (JSON.stringify(newUser) !== JSON.stringify(user)) {
          setUser(newUser);
        }
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);


  return (
    <Sidebar className="border-r border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5">
      <SidebarHeader className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-3 px-4">
          <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg relative overflow-hidden">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold text-xl gradient-text">Athar</h2>
            <p className="text-xs text-muted-foreground">منصة أثر</p>
          </div>
        </div>
        <div className="mt-4 mx-4 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ATHR Balance</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold gradient-text mt-1">
            {user?.athrBalance ? parseFloat(user.athrBalance).toFixed(2) : "0.00"}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    className={location === item.url ? "gradient-primary text-white shadow-lg" : ""}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url} className="rounded-xl">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    className={location === item.url ? "gradient-primary text-white shadow-lg" : ""}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url} className="rounded-xl">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">More</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    className={location === item.url ? "gradient-primary text-white shadow-lg" : ""}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url} className="rounded-xl">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
          <Avatar className="h-10 w-10 ring-2 ring-white/30">
            <AvatarFallback className="gradient-primary text-white font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "JD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name || "John Doe"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.athrBalance ? parseFloat(user.athrBalance).toFixed(2) : "0.00"} ATH</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}