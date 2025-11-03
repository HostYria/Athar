
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Upload, ArrowRight, Send, ArrowDownToLine, ArrowUpFromLine, Copy, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCodeDisplay from "./QRCodeDisplay";

interface SendReceiveFormProps {
  currency: string;
  userAddress: string;
}

export default function SendReceiveForm({ currency, userAddress }: SendReceiveFormProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"send" | "receive" | "deposit" | "withdraw">("send");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Amount must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency,
          amount: parseFloat(amount),
          recipient,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Transaction failed");
      }

      toast({
        title: "Success",
        description: `Sent ${amount} ${currency}`,
      });

      setAmount("");
      setRecipient("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };

  return (
    <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl gradient-text">{currency} Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="send" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Send</TabsTrigger>
            <TabsTrigger value="receive" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Receive</TabsTrigger>
            <TabsTrigger value="deposit" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4 mt-6">
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
                <TabsTrigger value="manual" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Manual</TabsTrigger>
                <TabsTrigger value="scan" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Scan QR</TabsTrigger>
                <TabsTrigger value="upload" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">Upload QR</TabsTrigger>
              </TabsList>
              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-sm font-medium">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter recipient address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="font-mono text-sm rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold tabular-nums rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                    disabled={isLoading}
                  />
                </div>
                <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg" onClick={handleSend} disabled={isLoading}>
                  <Send className="h-4 w-4 mr-2" />
                  Send {currency}
                </Button>
              </TabsContent>
              <TabsContent value="scan" className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5 backdrop-blur-sm">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">Camera access would open here</p>
                </div>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5 backdrop-blur-sm">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground mb-4">Upload QR code image</p>
                  <Button variant="outline" className="rounded-full backdrop-blur-sm bg-background/50 border-white/20">
                    Choose File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="receive" className="space-y-4 mt-6">
            <div className="space-y-4">
              <QRCodeDisplay address={userAddress} title={`Receive ${currency}`} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Your Address</Label>
                <div className="flex gap-2">
                  <Input
                    value={userAddress}
                    readOnly
                    className="font-mono text-sm rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                  />
                  <Button variant="outline" size="icon" onClick={handleCopyAddress} className="rounded-xl backdrop-blur-sm bg-background/50 border-white/20">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-full backdrop-blur-sm bg-background/50 border-white/20">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="rounded-full backdrop-blur-sm bg-background/50 border-white/20">
                  <Download className="h-4 w-4 mr-2" />
                  Save QR
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deposit" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                <p className="text-sm text-muted-foreground mb-4">Deposit {currency} to your wallet</p>
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount" className="text-sm font-medium">Amount</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    className="text-2xl font-bold tabular-nums rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                  />
                </div>
              </div>
              <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg">
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Deposit {currency}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20">
                <p className="text-sm text-muted-foreground mb-4">Withdraw {currency} from your wallet</p>
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount" className="text-sm font-medium">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    className="text-2xl font-bold tabular-nums rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                  />
                </div>
              </div>
              <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg">
                <ArrowUpFromLine className="h-4 w-4 mr-2" />
                Withdraw {currency}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
