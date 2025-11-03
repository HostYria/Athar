import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {currency}
        </CardTitle>
        {rate && (
          <span className="text-xs text-muted-foreground">{rate}</span>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-3xl font-bold tabular-nums">{balance}</div>
          <div className="text-sm text-muted-foreground">{symbol}</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {onSend && (
            <Button size="sm" variant="outline" onClick={onSend} data-testid={`button-send-${currency.toLowerCase()}`}>
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Send
            </Button>
          )}
          {onReceive && (
            <Button size="sm" variant="outline" onClick={onReceive} data-testid={`button-receive-${currency.toLowerCase()}`}>
              <ArrowDownLeft className="h-4 w-4 mr-1" />
              Receive
            </Button>
          )}
          {onTrade && (
            <Button size="sm" variant="default" onClick={onTrade} data-testid={`button-trade-${currency.toLowerCase()}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              Trade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
