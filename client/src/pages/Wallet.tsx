import { useState } from "react";
import WalletCard from "@/components/WalletCard";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import SendReceiveForm from "@/components/SendReceiveForm";
import ATHTrading from "@/components/ATHTrading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Wallet() {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [action, setAction] = useState<"send" | "receive" | null>(null);

  const handleSend = (currency: string) => {
    setSelectedCurrency(currency);
    setAction("send");
  };

  const handleReceive = (currency: string) => {
    setSelectedCurrency(currency);
    setAction("receive");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
        <p className="text-muted-foreground">Manage your digital assets</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <WalletCard
          currency="SYP Balance"
          balance="550,000"
          symbol="SYP"
          onSend={() => handleSend("SYP")}
          onReceive={() => handleReceive("SYP")}
        />
        <WalletCard
          currency="USD Balance"
          balance="125.50"
          symbol="USD"
          onSend={() => handleSend("USD")}
          onReceive={() => handleReceive("USD")}
        />
        <WalletCard
          currency="ATH Balance"
          balance="15,250"
          symbol="ATH"
          rate="1 ATH = 0.001 USD"
          onTrade={() => setAction(null)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <Tabs defaultValue="ath">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="syp" onClick={() => { setSelectedCurrency("SYP"); setAction("send"); }}>
                SYP
              </TabsTrigger>
              <TabsTrigger value="usd" onClick={() => { setSelectedCurrency("USD"); setAction("send"); }}>
                USD
              </TabsTrigger>
              <TabsTrigger value="ath">ATH</TabsTrigger>
            </TabsList>
            <TabsContent value="syp" className="mt-4">
              <SendReceiveForm currency="SYP" />
            </TabsContent>
            <TabsContent value="usd" className="mt-4">
              <SendReceiveForm currency="USD" />
            </TabsContent>
            <TabsContent value="ath" className="mt-4">
              <ATHTrading />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Address</h2>
          <QRCodeDisplay
            address="11039PKSG281027GGA01BA071"
            title="Wallet Address"
          />
        </div>
      </div>
    </div>
  );
}
