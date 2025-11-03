import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Wallet from "@/pages/Wallet";
import ChatRoom from "@/pages/ChatRoom";
import Match from "@/pages/Match";
import Store from "@/pages/Store";
import Account from "@/pages/Account";
import Friends from "@/pages/Friends";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import AuthPage from "@/pages/AuthPage";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import type { User } from "@shared/schema";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Wallet} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/chat" component={ChatRoom} />
      <Route path="/match" component={Match} />
      <Route path="/store" component={Store} />
      <Route path="/account" component={Account} />
      <Route path="/friends" component={Friends} />
      <Route path="/settings" component={Settings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  const [location] = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user && location !== "/auth") {
    return <AuthPage onAuthSuccess={setUser} />;
  }

  if (location === "/auth") {
    return <AuthPage onAuthSuccess={setUser} />;
  }


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <header className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border-b border-white/20 dark:border-white/10">
                <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-white/50 dark:hover:bg-white/10 rounded-xl" />
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold gradient-text">15,250 ATHR</span>
                  </div>
                </div>
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto p-8">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}