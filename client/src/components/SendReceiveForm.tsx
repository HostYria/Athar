import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Upload, ArrowRight, Send, ArrowDownToLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendReceiveFormProps {
  currency: string;
}

export default function SendReceiveForm({ currency }: SendReceiveFormProps) {
  const { toast } = useToast();
  const [mode, setMode] = useState<"send" | "receive">("send");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransaction = async () => {
    if (mode === "send") {
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
          description: `Sent ${amount} ${currency} to ${recipient.slice(0, 10)}...`,
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
    }
  };

  return (
    <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl gradient-text">Send {currency}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="manual" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-manual">Manual</TabsTrigger>
            <TabsTrigger value="scan" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-scan">Scan</TabsTrigger>
            <TabsTrigger value="upload" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Recipient Address</Label>
              <Input
                id="address"
                placeholder="Enter recipient address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="font-mono text-sm rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                data-testid="input-recipient-address"
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
                data-testid="input-amount"
                disabled={isLoading}
              />
            </div>
            <Button className="w-full rounded-full gradient-primary text-white border-0 shadow-lg" onClick={handleTransaction} data-testid="button-send" disabled={isLoading}>
              Send {currency}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </TabsContent>
          <TabsContent value="scan" className="space-y-4 mt-6">
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5 backdrop-blur-sm">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                Camera access would open here
              </p>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 mt-6">
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5 backdrop-blur-sm">
              <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload QR code image
              </p>
              <Button variant="outline" className="rounded-full backdrop-blur-sm bg-background/50 border-white/20" data-testid="button-upload-qr">
                Choose File
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}