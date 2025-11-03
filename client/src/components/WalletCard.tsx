import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";

interface WalletCardProps {
  currency: string;
  balance: string;
  symbol: string;
  rate?: string;
  onSend?: () => void;
  onReceive?: () => void;
  onTrade?: () => void;
}

export default function WalletCard({
  currency,
  balance,
  symbol,
  rate,
  onSend,
  onReceive,
  onTrade,
}: WalletCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-300" />
      <Card className="relative rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-full blur-3xl" />
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">{symbol.charAt(0)}</span>
            </div>
            {rate && (
              <span className="text-xs font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm">
                {rate}
              </span>
            )}
          </div>
          
          <div className="mb-1">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {currency}
            </div>
            <div className="text-4xl font-bold tabular-nums gradient-text mb-1">
              {balance}
            </div>
            <div className="text-sm text-muted-foreground">{symbol}</div>
          </div>

          <div className="flex gap-2 mt-6 flex-wrap">
            {onSend && (
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20 hover:bg-white/80 dark:hover:bg-white/10" 
                onClick={onSend} 
                data-testid={`button-send-${currency.toLowerCase()}`}
              >
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Send
              </Button>
            )}
            {onReceive && (
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20 hover:bg-white/80 dark:hover:bg-white/10" 
                onClick={onReceive} 
                data-testid={`button-receive-${currency.toLowerCase()}`}
              >
                <ArrowDownLeft className="h-4 w-4 mr-1" />
                Receive
              </Button>
            )}
            {onTrade && (
              <Button 
                size="sm" 
                className="rounded-full gradient-primary text-white border-0 shadow-lg" 
                onClick={onTrade} 
                data-testid={`button-trade-${currency.toLowerCase()}`}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Trade
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
