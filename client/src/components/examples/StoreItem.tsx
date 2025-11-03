import StoreItem from '../StoreItem';

export default function StoreItemExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StoreItem
        name="Premium Badge"
        price={5000}
        description="Show off your premium status"
        onPurchase={() => console.log('Purchase Premium Badge')}
      />
      <StoreItem
        name="Custom Theme"
        price={10000}
        description="Personalize your experience"
        onPurchase={() => console.log('Purchase Custom Theme')}
      />
      <StoreItem
        name="Voice Effects"
        price={7500}
        description="Transform your voice in calls"
        onPurchase={() => console.log('Purchase Voice Effects')}
      />
    </div>
  );
}
