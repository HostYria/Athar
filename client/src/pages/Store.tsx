import StoreItem from "@/components/StoreItem";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Store() {
  const { toast } = useToast();

  const handlePurchase = (itemName: string, price: number) => {
    toast({
      title: "Purchase Confirmed",
      description: `${itemName} purchased for ${price.toLocaleString()} ATH`,
    });
    console.log("Purchased:", itemName, price);
  };

  const storeItems = [
    { name: "Premium Badge", price: 5000, description: "Show off your premium status" },
    { name: "Custom Theme", price: 10000, description: "Personalize your experience" },
    { name: "Voice Effects", price: 7500, description: "Transform your voice in calls" },
    { name: "Extra Storage", price: 15000, description: "Expand your cloud storage" },
    { name: "Priority Support", price: 20000, description: "Get help faster" },
    { name: "Animated Avatar", price: 12000, description: "Stand out with animations" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Store</h1>
        <p className="text-muted-foreground">Purchase items with ATH</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          className="pl-10"
          data-testid="input-search-store"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {storeItems.map((item) => (
          <StoreItem
            key={item.name}
            name={item.name}
            price={item.price}
            description={item.description}
            onPurchase={() => handlePurchase(item.name, item.price)}
          />
        ))}
      </div>
    </div>
  );
}
