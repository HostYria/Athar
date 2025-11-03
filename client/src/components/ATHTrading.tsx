
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

  const calculateATHR = (amount: string, currency: string) => {
    const num = parseFloat(amount) || 0;
    const rate = rates[currency as keyof typeof rates];
    return (num / rate).toFixed(2);
  };

  const handleBuy = () => {
    if (!buyAmount) return;
    toast({
      title: "Purchase Successful",
      description: `Bought ${calculateATHR(buyAmount, buyCurrency)} ATHR for ${buyAmount} ${buyCurrency}`,
    });
    setBuyAmount("");
  };

  const handleSell = () => {
    if (!sellAmount) return;
    toast({
      title: "Sale Successful",
      description: `Sold ${sellAmount} ATHR for ${(parseFloat(sellAmount) * rates[sellCurrency as keyof typeof rates]).toFixed(2)} ${sellCurrency}`,
    });
    setSellAmount("");
  };

  const handleTransfer = () => {
    if (!transferAmount || !transferTo) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(transferAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum transfer amount is 100 ATHR",
        variant: "destructive",
      });
      return;
    }

    const fee = Math.max(amount * 0.00005, 100);
    toast({
      title: "Transfer Initiated",
      description: `Transferring ${transferAmount} ATHR to ${transferTo} (Fee: ${fee.toFixed(2)} ATHR)`,
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
          <CardTitle className="text-2xl gradient-text">ATHR Trading</CardTitle>
        </div>
        <div className="text-sm text-muted-foreground bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center gap-2 w-fit">
          <div className="h-2 w-2 rounded-full gradient-primary animate-pulse" />
          1 ATHR = 0.001 USD / 11 SYP
        </div>
      </CardHeader>
      <CardContent className="relative">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="buy" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Sell</TabsTrigger>
            <TabsTrigger value="transfer" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="buy-currency" className="text-sm font-medium">Pay With</Label>
              <Select value={buyCurrency} onValueChange={setBuyCurrency}>
                <SelectTrigger id="buy-currency" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buy-amount" className="text-sm font-medium">Amount ({buyCurrency})</Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="0.00"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
              />
              {buyAmount && (
                <p className="text-sm text-muted-foreground bg-white/30 dark:bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                  You will receive: <span className="font-semibold gradient-text">{calculateATHR(buyAmount, buyCurrency)} ATHR</span>
                </p>
              )}
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleBuy}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy ATHR
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="sell-currency" className="text-sm font-medium">Receive In</Label>
              <Select value={sellCurrency} onValueChange={setSellCurrency}>
                <SelectTrigger id="sell-currency" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sell-amount" className="text-sm font-medium">ATHR Amount</Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="0.00"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
              />
              {sellAmount && (
                <p className="text-sm text-muted-foreground bg-white/30 dark:bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                  You will receive: <span className="font-semibold gradient-text">{(parseFloat(sellAmount) * rates[sellCurrency as keyof typeof rates]).toFixed(2)} {sellCurrency}</span>
                </p>
              )}
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleSell}>
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell ATHR
            </Button>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="transfer-to" className="text-sm font-medium">Transfer To (Email or Username)</Label>
              <Input
                id="transfer-to"
                placeholder="Enter email or username"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-amount" className="text-sm font-medium">ATHR Amount</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20 text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Fee: 0.005% (minimum 100 ATHR)
              </p>
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all" onClick={handleTransfer}>
              <Send className="h-4 w-4 mr-2" />
              Transfer ATHR
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
