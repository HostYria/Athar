import { useState } from "react";
import WalletCard from "@/components/WalletCard";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import SendReceiveForm from "@/components/SendReceiveForm";
import ATHTrading from "@/components/ATHTrading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Wallet() {
  const userAddress = "11039PKSG281027GGA01BA071";
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
    <div className="space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 gradient-primary opacity-10 rounded-full blur-3xl" />
        <h1 className="text-5xl font-bold gradient-text mb-3 relative">My Wallet</h1>
        <p className="text-muted-foreground text-lg relative">Manage your digital assets</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Quick Actions</h2>
          <Tabs defaultValue="ath">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full p-1 shadow-lg">
              <TabsTrigger
                value="syp"
                className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
                onClick={() => { setSelectedCurrency("SYP"); setAction("send"); }}
              >
                SYP
              </TabsTrigger>
              <TabsTrigger
                value="usd"
                className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
                onClick={() => { setSelectedCurrency("USD"); setAction("send"); }}
              >
                USD
              </TabsTrigger>
              <TabsTrigger
                value="ath"
                className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                ATH
              </TabsTrigger>
            </TabsList>
            <TabsContent value="syp" className="mt-6">
              <SendReceiveForm currency="SYP" userAddress={userAddress} />
            </TabsContent>
            <TabsContent value="usd" className="mt-6">
              <SendReceiveForm currency="USD" userAddress={userAddress} />
            </TabsContent>
            <TabsContent value="ath" className="mt-6">
              <ATHTrading />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Your Address</h2>
          <QRCodeDisplay
            address={userAddress}
            title="Wallet Address"
          />
        </div>
      </div>
    </div>
  );
}