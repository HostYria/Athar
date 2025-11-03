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
import { TrendingUp, TrendingDown, Send } from "lucide-react";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          ATH Trading
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          1 ATH = 0.001 USD / 11 SYP
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy" data-testid="tab-buy">Buy</TabsTrigger>
            <TabsTrigger value="sell" data-testid="tab-sell">Sell</TabsTrigger>
            <TabsTrigger value="transfer" data-testid="tab-transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="buy-currency">Pay With</Label>
              <Select value={buyCurrency} onValueChange={setBuyCurrency}>
                <SelectTrigger id="buy-currency" data-testid="select-buy-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buy-amount">Amount</Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="0.00"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                data-testid="input-buy-amount"
              />
              {buyAmount && (
                <p className="text-sm text-muted-foreground">
                  You will receive: {calculateATH(buyAmount, buyCurrency)} ATH
                </p>
              )}
            </div>
            <Button className="w-full" onClick={handleBuy} data-testid="button-buy-ath">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy ATH
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sell-currency">Receive In</Label>
              <Select value={sellCurrency} onValueChange={setSellCurrency}>
                <SelectTrigger id="sell-currency" data-testid="select-sell-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sell-amount">ATH Amount</Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="0.00"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                data-testid="input-sell-amount"
              />
              {sellAmount && (
                <p className="text-sm text-muted-foreground">
                  You will receive: {(parseFloat(sellAmount) * rates[sellCurrency as keyof typeof rates]).toFixed(2)} {sellCurrency}
                </p>
              )}
            </div>
            <Button className="w-full" onClick={handleSell} data-testid="button-sell-ath">
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell ATH
            </Button>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-to">Transfer To</Label>
              <Input
                id="transfer-to"
                placeholder="Email or username"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                data-testid="input-transfer-to"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-amount">ATH Amount</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                data-testid="input-transfer-amount"
              />
              <p className="text-xs text-muted-foreground">
                Fee: 0.005% (minimum 100 ATH)
              </p>
            </div>
            <Button className="w-full" onClick={handleTransfer} data-testid="button-transfer-ath">
              <Send className="h-4 w-4 mr-2" />
              Transfer ATH
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
