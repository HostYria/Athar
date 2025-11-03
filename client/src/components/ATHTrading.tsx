import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ATHTrading() {
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [buyCurrency, setBuyCurrency] = useState("USD");
  const [sellCurrency, setSellCurrency] = useState("USD");
  const { toast } = useToast();

  const rates = {
    USD: 0.001,
    SYP: 11,
  };

  const calculateATH = (amount: string, currency: string) => {
    const num = parseFloat(amount) || 0;
    const rate = rates[currency as keyof typeof rates];
    return (num / rate).toFixed(2);
  };

  const handleBuy = () => {
    if (!buyAmount) return;
    console.log("Buying ATH:", { amount: buyAmount, currency: buyCurrency });
    toast({
      title: "Purchase Successful",
      description: `Bought ${calculateATH(buyAmount, buyCurrency)} ATH`,
    });
    setBuyAmount("");
  };

  const handleSell = () => {
    if (!sellAmount) return;
    console.log("Selling ATH:", { amount: sellAmount, currency: sellCurrency });
    toast({
      title: "Sale Successful",
      description: `Sold ${sellAmount} ATH`,
    });
    setSellAmount("");
  };

  const handleTransfer = () => {
    if (!transferAmount || !transferTo) return;
    console.log("Transferring ATH:", { amount: transferAmount, to: transferTo });
    toast({
      title: "Transfer Initiated",
      description: `Transferring ${transferAmount} ATH (Fee: 0.005%)`,
    });
    setTransferAmount("");
    setTransferTo("");
  };

  return (
    <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-5 rounded-full blur-3xl" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-2xl gradient-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-2xl gradient-text">ATH Trading</CardTitle>
        </div>
        <div className="text-sm text-muted-foreground bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2 w-fit">
          <div className="h-2 w-2 rounded-full gradient-primary animate-pulse" />
          1 ATH = 0.001 USD / 11 SYP
        </div>
      </CardHeader>
      <CardContent className="relative">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="buy" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-buy">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-sell">Sell</TabsTrigger>
            <TabsTrigger value="transfer" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="buy-currency" className="text-sm font-medium">Pay With</Label>
              <Select value={buyCurrency} onValueChange={setBuyCurrency}>
                <SelectTrigger id="buy-currency" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20" data-testid="select-buy-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buy-amount" className="text-sm font-medium">Amount</Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="0.00"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
                data-testid="input-buy-amount"
              />
              {buyAmount && (
                <p className="text-sm text-muted-foreground bg-white/30 dark:bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                  You will receive: <span className="font-semibold gradient-text">{calculateATH(buyAmount, buyCurrency)} ATH</span>
                </p>
              )}
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleBuy} data-testid="button-buy-ath">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy ATH
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="sell-currency" className="text-sm font-medium">Receive In</Label>
              <Select value={sellCurrency} onValueChange={setSellCurrency}>
                <SelectTrigger id="sell-currency" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20" data-testid="select-sell-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sell-amount" className="text-sm font-medium">ATH Amount</Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="0.00"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
                data-testid="input-sell-amount"
              />
              {sellAmount && (
                <p className="text-sm text-muted-foreground bg-white/30 dark:bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                  You will receive: <span className="font-semibold gradient-text">{(parseFloat(sellAmount) * rates[sellCurrency as keyof typeof rates]).toFixed(2)} {sellCurrency}</span>
                </p>
              )}
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleSell} data-testid="button-sell-ath">
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell ATH
            </Button>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="transfer-to" className="text-sm font-medium">Transfer To</Label>
              <Input
                id="transfer-to"
                placeholder="Email or username"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                data-testid="input-transfer-to"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-amount" className="text-sm font-medium">ATH Amount</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
                data-testid="input-transfer-amount"
              />
              <p className="text-xs text-muted-foreground">
                Fee: 0.005% (minimum 100 ATH)
              </p>
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleTransfer} data-testid="button-transfer-ath">
              <Send className="h-4 w-4 mr-2" />
              Transfer ATH
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
