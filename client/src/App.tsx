import { Switch, Route } from "wouter";
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/50 dark:bg-white/5 border-b border-white/20 dark:border-white/10">
                  <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-white/50 dark:hover:bg-white/10 rounded-xl" />
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto p-8">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
