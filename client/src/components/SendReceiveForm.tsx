import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Upload, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendReceiveFormProps {
  currency: string;
}

export default function SendReceiveForm({ currency }: SendReceiveFormProps) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!amount || !address) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and recipient address",
        variant: "destructive",
      });
      return;
    }
    console.log("Sending:", { amount, address, currency });
    toast({
      title: "Transaction Initiated",
      description: `Sending ${amount} ${currency}`,
    });
    setAmount("");
    setAddress("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send {currency}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual" data-testid="tab-manual">Manual</TabsTrigger>
            <TabsTrigger value="scan" data-testid="tab-scan">Scan QR</TabsTrigger>
            <TabsTrigger value="upload" data-testid="tab-upload">Upload QR</TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Recipient Address</Label>
              <Input
                id="address"
                placeholder="Enter recipient address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono text-sm"
                data-testid="input-recipient-address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold tabular-nums"
                data-testid="input-amount"
              />
            </div>
            <Button className="w-full" onClick={handleSend} data-testid="button-send">
              Send {currency}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </TabsContent>
          <TabsContent value="scan" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <QrCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Camera access would open here
              </p>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload QR code image
              </p>
              <Button variant="outline" data-testid="button-upload-qr">
                Choose File
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
