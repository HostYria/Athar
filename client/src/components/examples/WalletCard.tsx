import WalletCard from '../WalletCard';

export default function WalletCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <WalletCard
        currency="SYP Balance"
        balance="550,000"
        symbol="SYP"
        onSend={() => console.log('Send SYP')}
        onReceive={() => console.log('Receive SYP')}
      />
      <WalletCard
        currency="USD Balance"
        balance="125.50"
        symbol="USD"
        onSend={() => console.log('Send USD')}
        onReceive={() => console.log('Receive USD')}
      />
      <WalletCard
        currency="ATH Balance"
        balance="15,250"
        symbol="ATH"
        rate="1 ATH = 0.001 USD"
        onTrade={() => console.log('Trade ATH')}
      />
    </div>
  );
}
